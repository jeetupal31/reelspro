"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import VideoFeed from "./components/VideoFeed";
import { IVideo } from "@/models/Video";
import { apiClient } from "@/lib/api-client";

export default function Home() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideos();
        setVideos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Hero */}
      <section className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-600/20 via-zinc-900 to-zinc-900 p-8 sm:p-12">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute -bottom-12 left-1/3 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-fuchsia-400" /> Powered by ImageKit CDN
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Share your moments in{" "}
            <span className="bg-gradient-to-r from-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
              vertical video
            </span>
          </h1>
          <p className="mt-4 max-w-lg text-zinc-400">
            Upload, transcode and stream short-form videos with adaptive quality
            — a full-stack Reels experience built on Next.js and MongoDB.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/upload"
              className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-900/40 transition hover:-translate-y-0.5"
            >
              ⬆ Upload a reel
            </Link>
            <Link
              href="/login"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Feed */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest reels</h2>
        <span className="text-sm text-zinc-500">
          {loading ? "Loading…" : `${videos.length} video${videos.length === 1 ? "" : "s"}`}
        </span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[9/16] animate-pulse rounded-2xl border border-white/10 bg-white/5"
            />
          ))}
        </div>
      ) : (
        <VideoFeed videos={videos} />
      )}
    </main>
  );
}
