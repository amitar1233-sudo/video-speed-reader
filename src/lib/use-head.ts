import { useEffect } from "react";

export type HeadMeta = {
  title: string;
  description: string;
  twitterCard?: "summary" | "summary_large_image";
  noindex?: boolean;
};

function setMeta(attr: "name" | "property", key: string, content: string | null) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Client-side replacement for TanStack's per-route head(): sets title and meta tags. */
export function useHead({
  title,
  description,
  twitterCard = "summary",
  noindex = false,
}: HeadMeta) {
  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", twitterCard);
    setMeta("name", "robots", noindex ? "noindex" : null);
  }, [title, description, twitterCard, noindex]);
}
