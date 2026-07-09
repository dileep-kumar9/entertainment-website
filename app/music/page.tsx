import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";

export default function Music() {
  const music = [
    { title: "Bollywood Top", type: "Music" },
    { title: "LoFi Chill", type: "Music" }
  ];

  return (
    <div>
      <Navbar />
      <h1 style={{ fontSize: 32, padding: 20 }}>Music</h1>
      {music.map((m, i) => <ContentCard key={i} {...m} />)}
    </div>
  );
}
