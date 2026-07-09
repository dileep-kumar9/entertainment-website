"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        background: "#111",
        borderBottom: "1px solid #222",
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <Link href="/" style={{ color: "white", textDecoration: "none", fontWeight: 600 }}>
          Entertainment Hub
        </Link>
        <Link href="/movies" style={{ color: "#ccc", textDecoration: "none" }}>Movies</Link>
        <Link href="/music" style={{ color: "#ccc", textDecoration: "none" }}>Music</Link>
        {user && (
          <Link href="/profile" style={{ color: "#ccc", textDecoration: "none" }}>Profile</Link>
        )}
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {user ? (
          <>
            <span style={{ color: "#aaa", fontSize: 14 }}>{user.email}</span>
            <button
              onClick={() => signOut(auth)}
              style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid #444", background: "transparent", color: "white", cursor: "pointer" }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ color: "white", textDecoration: "none" }}>Log in</Link>
            <Link
              href="/signup"
              style={{ padding: "6px 14px", borderRadius: 6, background: "#e50914", color: "white", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
