"use client";

import { useState } from "react";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "./AuthProvider";

export type Video = {
  id: string;
  title: string;
  channel: string;
  thumbnail: string;
};

type Props = {
  video: Video;
  onPlay: (video: Video) => void;
  saved?: boolean;
  onUnsave?: (id: string) => void;
};

export default function VideoCard({ video, onPlay, saved, onUnsave }: Props) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(!!saved);
  const [busy, setBusy] = useState(false);

  async function toggleSave(e: React.MouseEvent) {
    e.stopPropagation();
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setBusy(true);
    const ref = doc(db, "users", user.uid, "saved", video.id);
    try {
      if (isSaved) {
        await deleteDoc(ref);
        setIsSaved(false);
        onUnsave?.(video.id);
      } else {
        await setDoc(ref, video);
        setIsSaved(true);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      onClick={() => onPlay(video)}
      style={{
        cursor: "pointer",
        background: "#151515",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #222",
      }}
    >
      <img src={video.thumbnail} alt={video.title} style={{ width: "100%", display: "block" }} />
      <div style={{ padding: 12 }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>{video.title}</p>
        <p style={{ margin: "6px 0 10px", fontSize: 12, color: "#999" }}>{video.channel}</p>
        <button
          onClick={toggleSave}
          disabled={busy}
          style={{
            fontSize: 12,
            padding: "6px 10px",
            borderRadius: 6,
            border: "1px solid #444",
            background: isSaved ? "#e50914" : "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          {isSaved ? "★ Saved" : "☆ Save"}
        </button>
      </div>
    </div>
  );
}
