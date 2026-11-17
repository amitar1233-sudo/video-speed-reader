import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { useAuthUser } from "@/components/RequireAuth";
import { useHead } from "@/lib/use-head";

export default function Dashboard() {
  useHead({
    title: "Dashboard — Video Speed Reader",
    description: "Your Video Speed Reader dashboard.",
    noindex: true,
  });
  const user = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-glow" aria-hidden />
      <header className="relative z-10 border-b border-border bg-card/40 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <button
            onClick={signOut}
            className="rounded-full border border-border px-4 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:bg-accent"
          >
            Sign out / 登出
          </button>
        </div>
      </header>
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center">
        <h1 className="break-words text-4xl font-bold sm:text-5xl">
          Hi <span className="text-gradient">{user.email}</span>
        </h1>
        <div className="mt-10 rounded-2xl border border-dashed border-primary/40 bg-card/80 p-10 shadow-soft">
          <p className="text-lg text-muted-foreground">
            Your dashboard is coming soon. Upload functionality will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
