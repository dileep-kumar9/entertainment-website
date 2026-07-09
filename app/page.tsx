"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import VideoCard, { Video } from "@/components/VideoCard";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [playing, setPlaying] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(query: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setVideos([]);
      } else {
        setVideos(data.videos);
      }
    } catch {
      setError("Something went wrong searching YouTube.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch("Telugu full movie 2026");
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: 32, padding: "24px 24px 0" }}>Entertainment Hub</h1>
      <p style={{ padding: "4px 24px 0", color: "#999" }}>Search any movie, show, or music video on YouTube.</p>

      <SearchBar onSearch={handleSearch} placeholder="Search movies, music, anything..." />

      {loading && <p style={{ padding: "0 24px" }}>Searching...</p>}
      {error && <p style={{ padding: "0 24px", color: "#ff6b6b" }}>{error}</p>}

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
