import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";

import { supabase } from "@/integrations/supabase/client";

type AuthContext = { user: User };

/** Client-side guard for signed-in routes: redirects to /auth when there is no user. */
export function RequireAuth() {
  const [state, setState] = useState<
    { status: "loading" } | { status: "ready"; user: User | null }
  >({
    status: "loading",
  });

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (active) setState({ status: "ready", user: data.user });
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        setState({ status: "ready", user: session?.user ?? null });
      }
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  if (state.status === "loading") return <div className="min-h-screen bg-background" />;
  if (!state.user) return <Navigate to="/auth" replace />;
  return <Outlet context={{ user: state.user } satisfies AuthContext} />;
}

export function useAuthUser(): User {
  return useOutletContext<AuthContext>().user;
}
