import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { Blog } from "../../interfaces/Blog";
import AppWrapper from "../../components/AppWrapper.tsx";

const themes = {
  light: {
    "--bg": "#fafafa",
    "--surface": "#ffffff",
    "--text": "#0a0a0a",
    "--muted": "#6b7280",
    "--border": "#e5e7eb",
    "--accent": "#4f46e5",
    "--accent-text": "#ffffff",
  },
  dark: {
    "--bg": "#09090b",
    "--surface": "#111113",
    "--text": "#fafafa",
    "--muted": "#a1a1aa",
    "--border": "#27272a",
    "--accent": "#818cf8",
    "--accent-text": "#09090b",
  },
} as const;

const formatDate = (date: string | number | Date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const excerpt = (html?: string, max = 110) => {
  const plain = (html ?? "").replace(/<[^>]*>/g, "").trim();
  return plain.length > max ? plain.slice(0, max).trimEnd() + "…" : plain;
};

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition hover:border-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[var(--border)]">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
          {blog.category && (
            <span className="rounded-full border border-[var(--border)] px-2.5 py-0.5 font-medium text-[var(--text)]">
              {blog.category}
            </span>
          )}
          <span>{blog.createdAt ? formatDate(blog.createdAt) : ""}</span>
        </div>
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-[var(--text)]">
          {blog.title}
        </h3>
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          {excerpt(blog.body)}
        </p>
        <span className="mt-auto pt-2 text-sm font-medium text-[var(--accent)]">
          Read log
        </span>
      </div>
    </Link>
  );
}

function CardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      <div className="aspect-[16/10] bg-[var(--border)]" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 rounded bg-[var(--border)]" />
        <div className="h-5 w-4/5 rounded bg-[var(--border)]" />
        <div className="h-3 w-full rounded bg-[var(--border)]" />
        <div className="h-3 w-2/3 rounded bg-[var(--border)]" />
      </div>
    </div>
  );
}

function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://blogsite-bdkx.onrender.com/api/posts");
        if (!res.ok) throw new Error("Request failed");
        setBlogs(await res.json());
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (error)
    return (
      <p className="py-16 text-center text-[var(--muted)]">
        Couldn't load logs. Refresh to try again.
      </p>
    );

  if (!loading && blogs.length === 0)
    return (
      <p className="py-16 text-center text-[var(--muted)]">No logs yet.</p>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)
        : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
    </div>
  );
}

function Home() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      style={themes[darkMode ? "dark" : "light"] as React.CSSProperties}
      className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors"
    >
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[var(--border)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-30"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 0%, var(--accent), transparent 70%)",
          }}
        />
        <AppWrapper>
          <div className="relative flex justify-end pt-5">
            <button
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle theme"
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm font-medium transition hover:border-[var(--accent)]"
            >
              {darkMode ? "Light" : "Dark"}
            </button>
          </div>

          <section className="relative flex flex-col items-center pb-20 pt-14 text-center sm:pb-28 sm:pt-20">
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-sm text-[var(--muted)]">
              Personal tech, projects and ideas
            </span>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Running ideas through the internet.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              A personal corner of the web for documenting projects,
              experiments, thoughts and technology.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#logs"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-text)] transition hover:opacity-90"
              >
                Read logs
              </a>
              <Link
                to="/projects"
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)]"
              >
                View projects
              </Link>
            </div>
          </section>
        </AppWrapper>
      </header>

      {/* Logs */}
      <main id="logs" className="scroll-mt-4 py-16">
        <AppWrapper>
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Latest logs
            </h2>
          </div>
          <Blogs />
        </AppWrapper>
      </main>
    </div>
  );
}

export default Home;
