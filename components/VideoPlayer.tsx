"use client";

import { Video } from "./VideoCard";

type Props = {
  video: Video | null;
  onClose: () => void;
};

export default function VideoPlayer({ video, onClose }: Props) {
  if (!video) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: 20,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 900 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>{video.title}</h2>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", color: "white", fontSize: 22, cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
        <div style={{ position: "relative", paddingTop: "56.25%" }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none", borderRadius: 8 }}
          />
        </div>
      </div>
    </div>
  );
}
