"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import VideoCard, { Video } from "@/components/VideoCard";
import VideoPlayer from "@/components/VideoPlayer";

export default function Music() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playing, setPlaying] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);

  async function search(query: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setVideos(data.videos || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    search("Telugu top music hits 2026");
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 32, padding: "24px 24px 0" }}>Music</h1>
      <SearchBar onSearch={search} placeholder="Search for a song or artist..." />

      {loading && <p style={{ padding: "0 24px" }}>Loading...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          padding: 24,
        }}
      >
        {videos.map((v) => (
          <VideoCard key={v.id} video={v} onPlay={setPlaying} />
        ))}
      </div>

      <VideoPlayer video={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}
