type ContentCardProps = {
  title: string;
  type: string;
};

export default function ContentCard({ title, type }: ContentCardProps) {
  return (
    <div style={{ border: "1px solid #333", padding: 20, borderRadius: 12, margin: 20 }}>
      <h2>{title}</h2>
      <p>{type}</p>
      <button style={{ padding: 10, marginTop: 10 }}>Play</button>
    </div>
  );
}
