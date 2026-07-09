"use client";

import { useState } from "react";

type Props = {
  onSearch: (query: string) => void;
  placeholder?: string;
};

export default function SearchBar({ onSearch, placeholder }: Props) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, padding: "20px 24px" }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search YouTube..."}
        style={{
          flex: 1,
          padding: 12,
          borderRadius: 6,
          border: "1px solid #333",
          background: "#1a1a1a",
          color: "white",
          fontSize: 15,
        }}
      />
      <button
        type="submit"
        style={{ padding: "12px 20px", borderRadius: 6, border: "none", background: "#e50914", color: "white", cursor: "pointer" }}
      >
        Search
      </button>
    </form>
  );
}
