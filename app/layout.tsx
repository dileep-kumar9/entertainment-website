import { AuthProvider } from "@/components/AuthProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Entertainment Hub — Watch Telugu Movies & Music Free",
  description:
    "Search and stream Telugu movies, Tollywood trailers, and music videos. Create a free account to save your favorites and pick up where you left off.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Entertainment Hub",
    description: "Search and stream Telugu movies, trailers, and music videos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0a0a", color: "white", fontFamily: "sans-serif", margin: 0 }}>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
