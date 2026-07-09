import { NextRequest, NextResponse } from "next/server";

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "YOUTUBE_API_KEY is not set" }, { status: 500 });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=16&q=${encodeURIComponent(
    q
  )}&key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: res.status });
    }

    const videos = (data.items || []).map((item: any) => ({
      id: item.id.videoId,
      title: decodeHtmlEntities(item.snippet.title),
      channel: decodeHtmlEntities(item.snippet.channelTitle),
      thumbnail: item.snippet.thumbnails?.medium?.url,
    }));

    return NextResponse.json({ videos });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch from YouTube" }, { status: 500 });
  }
}
