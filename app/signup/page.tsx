"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Create your account</h1>

      <form onSubmit={handleEmailSignup} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Sign up</button>
      </form>

      {error && <p style={{ color: "#ff6b6b", marginTop: 12 }}>{error}</p>}

      <div style={{ margin: "20px 0", textAlign: "center", color: "#666" }}>or</div>

      <button onClick={handleGoogleSignup} style={{ ...buttonStyle, background: "#fff", color: "#111" }}>
        Continue with Google
      </button>

      <p style={{ marginTop: 20, color: "#999" }}>
        Already have an account? <Link href="/login" style={{ color: "#e50914" }}>Log in</Link>
      </p>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 6,
  border: "1px solid #333",
  background: "#1a1a1a",
  color: "white",
  fontSize: 15,
};

const buttonStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 6,
  border: "none",
  background: "#e50914",
  color: "white",
  fontSize: 15,
  cursor: "pointer",
};
