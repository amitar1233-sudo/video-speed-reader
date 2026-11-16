import { describe, expect, it } from "vitest";
import { matchRoutes } from "react-router-dom";

import { routes } from "@/App";

function leafPath(pathname: string) {
  return matchRoutes(routes, pathname)?.at(-1)?.route.path;
}

// Match routes without rendering: pages need Supabase env and network the test run lacks.
describe("App routing", () => {
  it("matches real pages instead of the not-found route", () => {
    expect(leafPath("/")).toBe("/");
    expect(leafPath("/auth")).toBe("/auth");
    expect(leafPath("/app")).toBe("/app");
    expect(leafPath("/sign-in")).toBe("/sign-in");
    expect(leafPath("/sign-up")).toBe("/sign-up");
  });

  it("falls back to not found for unknown paths", () => {
    expect(leafPath("/does-not-exist")).toBe("*");
  });
});
