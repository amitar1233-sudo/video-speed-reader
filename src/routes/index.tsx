import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { useFadeIn } from "@/hooks/use-fade-in";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Video Speed Reader — 三分鐘拿到影片逐字稿" },
      { name: "description", content: "上傳影片，三分鐘內拿到逐字稿。Upload your video, get a clean transcript in three minutes." },
      { property: "og:title", content: "Video Speed Reader — 三分鐘拿到影片逐字稿" },
      { property: "og:description", content: "Upload your video, get a clean transcript in three minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const features = [
  { icon: "🎯", title: "高準確度逐字稿", en: "High-accuracy transcripts", body: "Powered by OpenAI Whisper, supports Chinese and English." },
  { icon: "⚡", title: "三分鐘交付", en: "Three-minute turnaround", body: "Processed in the background — you get an email when it's ready." },
  { icon: "📜", title: "可商用授權", en: "Commercial-use ready", body: "You own the output. Use it however you like." },
];

function FadeIn({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useFadeIn<HTMLDivElement>();
  return (
    <div ref={ref} className={`fade-up ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Index() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-glow" aria-hidden />
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Logo />
        <Link
          to="/auth"
          className="rounded-full bg-gradient-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
        >
          Sign in / 登入
        </Link>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-4xl px-6 pb-24 pt-20 text-center sm:pt-32">
          <FadeIn>
            <p className="mx-auto mb-6 inline-block rounded-full border border-border bg-card/60 px-4 py-1 text-xs font-medium text-muted-foreground">
              For creators · educators · engineers
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
              <span className="text-gradient">Video Speed Reader</span>
            </h1>
            <p className="mt-6 text-2xl font-semibold sm:text-3xl">上傳影片，三分鐘內拿到逐字稿。</p>
            <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
              Upload your video, get a clean transcript in three minutes.
            </p>
            <div className="mt-10">
              <Link
                to="/auth"
                search={{ mode: "signup" }}
                className="inline-flex rounded-full bg-gradient-primary px-8 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Get started free
              </Link>
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-32 md:grid-cols-3">
          {features.map((f, i) => (
            <FadeIn key={f.en} delay={i * 120}>
              <article className="h-full rounded-2xl border border-border bg-card/70 p-8 backdrop-blur transition-colors hover:border-primary/50">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-accent text-2xl">{f.icon}</div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-sm font-medium text-primary-glow">{f.en}</p>
                <p className="mt-4 text-muted-foreground">{f.body}</p>
              </article>
            </FadeIn>
          ))}
        </section>
      </main>

      <footer className="relative z-10 border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 Video Speed Reader
      </footer>
    </div>
  );
}
