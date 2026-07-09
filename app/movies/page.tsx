import Navbar from "@/components/Navbar";
import ContentCard from "@/components/ContentCard";

export default function Movies() {
  const movies = [
    { title: "RRR", type: "Movie" },
    { title: "Pushpa", type: "Movie" },
    { title: "KGF", type: "Movie" }
  ];

  return (
    <div>
      <Navbar />
      <h1 style={{ fontSize: 32, padding: 20 }}>Movies</h1>
      {movies.map((m, i) => <ContentCard key={i} {...m} />)}
    </div>
  );
}
