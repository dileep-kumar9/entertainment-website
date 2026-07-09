import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";

export default function Home() {
  const content = [
    { title: "RRR", type: "Movie" },
    { title: "Salaar", type: "Movie" },
    { title: "Telugu Hits 2025", type: "Music" }
  ];

  return (
    <div>
      <Navbar />
      <h1 style={{ fontSize: 40, textAlign: "center", margin: 20 }}>
        Entertainment Hub
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20, padding: 20 }}>
        {content.map((item, i) => (
          <ContentCard key={i} {...item} />
        ))}
      </div>
    </div>
  );
}
