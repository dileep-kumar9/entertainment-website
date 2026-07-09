"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/components/AuthProvider";
import VideoCard, { Video } from "@/components/VideoCard";
import VideoPlayer from "@/components/VideoPlayer";

export default function Profile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState<Video[]>([]);
  const [fetching, setFetching] = useState(true);
  const [playing, setPlaying] = useState<Video | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    async function loadSaved() {
      if (!user) return;
      const snap = await getDocs(collection(db, "users", user.uid, "saved"));
      setSaved(snap.docs.map((d) => d.data() as Video));
      setFetching(false);
    }
    if (user) loadSaved();
  }, [user]);

  function handleUnsave(id: string) {
    setSaved((prev) => prev.filter((v) => v.id !== id));
  }

  if (loading || !user) {
    return <p style={{ padding: 24 }}>Loading...</p>;
  }

  return (
    <div>
      <h1 style={{ fontSize: 32, padding: "24px 24px 0" }}>Your Saved Videos</h1>
      <p style={{ padding: "4px 24px 0", color: "#999" }}>{user.email}</p>

      {fetching && <p style={{ padding: 24 }}>Loading your list...</p>}
      {!fetching && saved.length === 0 && (
        <p style={{ padding: 24, color: "#999" }}>
          Nothing saved yet — search for something and tap ☆ Save.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 20,
          padding: 24,
        }}
      >
        {saved.map((v) => (
          <VideoCard key={v.id} video={v} onPlay={setPlaying} saved onUnsave={handleUnsave} />
        ))}
      </div>

      <VideoPlayer video={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}
