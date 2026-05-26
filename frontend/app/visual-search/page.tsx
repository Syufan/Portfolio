"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

const HF_DATASET =
  "https://huggingface.co/datasets/Yufanjeff/tll-images/resolve/main/right";

const GALLERY_POOL = [
  "osr",
  "ojm",
  "ofq",
  "lej",
  "yug",
  "qtp",
  "rzf",
  "unp",
  "baq",
  "box",
  "yfk",
  "ogx",
  "jub",
  "xft",
  "xii",
  "uax",
  "ohf",
  "vac",
  "gvn",
  "ldg",
  "vvo",
  "kya",
  "edv",
  "lmt",
  "gdk",
  "kai",
  "fcp",
  "orh",
  "rhj",
  "gfs",
];

function galleryUrl(name: string) {
  return `${HF_DATASET}/${name}.jpg`;
}

function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

interface SearchResult {
  rank: number;
  index: number;
  score: number;
  image_url?: string;
}

type Status = "idle" | "warming" | "searching" | "done" | "error";

export default function VisualSearchPage() {
  const [examples] = useState(() => pickRandom(GALLERY_POOL, 3));
  const [status, setStatus] = useState<Status>("idle");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [queryPreview, setQueryPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const searchIdRef = useRef(0);

  useEffect(() => {
    setStatus("warming");
    fetch("/api/visual-search").finally(() => setStatus("idle"));
  }, []);

  async function runSearch(file: File, preview: string) {
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    setQueryPreview(preview);
    setStatus("searching");
    setResults([]);

    const form = new FormData();
    form.append("file", file);

    try {
      const res = await fetch("/api/visual-search?k=3", {
        method: "POST",
        body: form,
        signal,
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResults(data.results ?? []);
      setStatus("done");
      setTimeout(
        () =>
          resultsRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        100,
      );
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setStatus("error");
    }
  }

  async function searchByUrl(url: string, name: string) {
    const id = ++searchIdRef.current;
    setStatus("searching");
    setQueryPreview(url);
    setResults([]);

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      if (id !== searchIdRef.current) return;
      const file = new File([blob], `${name}.jpg`, { type: "image/jpeg" });
      await runSearch(file, url);
    } catch {
      if (id !== searchIdRef.current) return;
      setStatus("error");
    }
  }

  function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const file = files[0];
    runSearch(file, URL.createObjectURL(file));
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const busy = status === "searching";

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-6 lg:px-20">
      {/* back link */}
      <Link
        href="/projects"
        className="text-teal-300 text-base flex items-center gap-1 group transition-colors duration-150"
      >
        <span className="inline-block transition-transform duration-150 group-hover:-translate-x-1.5">
          ←
        </span>
        All Projects
      </Link>

      {/* header */}
      <div className="mt-8">
        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
          Does this look like that?
        </h1>
        <p className="mt-6 text-xl lg:text-2.8xl text-slate-300 font-medium leading-snug">
          Everything has a twin. Find yours!
        </p>
      </div>

      {/* example images */}
      <div className="mt-8 inline-flex flex-col">
        <div className="flex gap-4">
          {examples.map((name) => (
            <button
              key={name}
              disabled={busy}
              onClick={() => searchByUrl(galleryUrl(name), name)}
              className="mt-3 group relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-lg overflow-hidden ring-1 ring-slate-700 hover:ring-teal-400 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryUrl(name)}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-200" />
            </button>
          ))}
        </div>
        <span className="mt-6 text-right text-slate-600 text-xs font-mono">
          — Powered by CLIP ViT-B/32 + LoRA · 2,000-image gallery
        </span>
      </div>

      {/* divider */}
      <div className="mt-6 flex items-center gap-4 max-w-md">
        <div className="flex-1 h-px bg-slate-700" />
        <span className="text-slate-500 text-sm">or upload your own</span>
        <div className="flex-1 h-px bg-slate-700" />
      </div>

      {/* upload zone */}
      <div
        className={`mt-6 max-w-md rounded-xl border-2 border-dashed transition-colors duration-200 cursor-pointer ${
          dragging
            ? "border-teal-400 bg-teal-400/5"
            : "border-slate-700 hover:border-slate-500"
        } ${busy ? "pointer-events-none opacity-40" : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="py-10 flex flex-col items-center gap-3 text-center px-6">
          <div className="text-3xl">
            {busy ? <span className="inline-block animate-spin">↻</span> : "↑"}
          </div>
          <p className="text-slate-300 text-sm">
            {busy ? "Searching…" : "Drop an image or click to browse"}
          </p>
          <p className="text-slate-500 text-xs">JPG, PNG, WEBP</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {status === "warming" && (
        <p className="mt-3 text-slate-500 text-xs">Waking up the model…</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-red-400 text-xs">
          Something went wrong. The model may be starting up — try again in a
          moment.
        </p>
      )}

      {/* results */}
      {(status === "done" || status === "searching") && queryPreview && (
        <div ref={resultsRef} className="mt-14">
          <p className="text-xs font-medium tracking-widest uppercase text-slate-400 mb-6">
            Visual matches
          </p>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="shrink-0">
              <p className="text-slate-500 text-xs mb-2">Your image</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={queryPreview}
                alt="query"
                className="w-28 h-28 object-cover rounded-lg ring-1 ring-slate-700"
              />
            </div>

            <div className="flex-1">
              {status === "searching" ? (
                <div className="flex gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-lg bg-slate-800 animate-pulse shrink-0"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex gap-4">
                  {results.map((r) => (
                    <div
                      key={r.rank}
                      className="group relative w-24 h-24 sm:w-36 sm:h-36 lg:w-44 lg:h-44 shrink-0"
                    >
                      {r.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={r.image_url}
                          alt={`match ${r.rank}`}
                          className="w-full h-full object-cover rounded-lg ring-1 ring-slate-700"
                        />
                      ) : (
                        <div className="w-full h-full rounded-lg bg-slate-800" />
                      )}
                      <div className="absolute inset-0 flex items-end justify-center pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        <span className="text-xs text-white bg-slate-900/80 rounded px-1 py-0.5">
                          {(r.score * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {status === "done" && (
            <button
              onClick={() => {
                setStatus("idle");
                setResults([]);
                setQueryPreview(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="mt-8 text-sm text-slate-400 hover:text-teal-300 transition-colors duration-150"
            >
              ← Try another image
            </button>
          )}
        </div>
      )}
    </div>
  );
}
