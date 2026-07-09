import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{ display: "flex", gap: 20, padding: 20, background: "#111" }}>
      <Link href="/">Home</Link>
      <Link href="/movies">Movies</Link>
      <Link href="/music">Music</Link>
      <Link href="/profile">Profile</Link>
    </div>
  );
}
