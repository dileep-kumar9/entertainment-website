"use client";

import { Video } from "./VideoCard";

type Props = {
  video: Video;
  onWatch: (video: Video) => void;
};

export default function Hero({ video, onWatch }: Props) {
  const backdrop = video.thumbnail.replace("/mqdefault", "/hqdefault");

  return (
    <div
      style={{
        position: "relative",
        height: "60vh",
        minHeight: 380,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -20,
          backgroundImage: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.55) saturate(1.1)",
          animation: "heroFloat 18s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(0deg, #0a0a0a 5%, rgba(10,10,10,0.2) 55%, rgba(10,10,10,0.6) 100%)",
        }}
      />

      <div style={{ position: "relative", padding: "0 32px 40px", maxWidth: 800 }}>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 52px)",
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            textShadow: "0 4px 20px rgba(0,0,0,0.6)",
          }}
        >
          {video.title}
        </h1>
        <p style={{ color: "#ccc", letterSpacing: 2, textTransform: "uppercase", fontSize: 13, marginTop: 14 }}>
          {video.channel}
        </p>
        <button
          onClick={() => onWatch(video)}
          style={{
            marginTop: 18,
            padding: "12px 28px",
            borderRadius: 6,
            border: "none",
            background: "#e50914",
            color: "white",
            fontWeight: 700,
            letterSpacing: 1,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          ▶ WATCH NOW
        </button>
      </div>

      <style>{`
        @keyframes heroFloat {
          0%   { transform: scale(1.08) translate(0px, 0px); }
          50%  { transform: scale(1.16) translate(-1.5%, -1%); }
          100% { transform: scale(1.08) translate(0px, 0px); }
        }
      `}</style>
    </div>
  );
}
