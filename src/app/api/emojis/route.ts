import { NextResponse } from "next/server";
import type { Emoji } from "@/app/types/Emoji";

const curatedSlugs = [
  "headphone",
  "calendar",
  "hourglass-not-done",
  "e0-7-thermometer",
  "e1-0-busts-in-silhouette",
  "e0-6-information",
  "e0-6-thumbs-up",
  "e0-6-currency-exchange",
  "e0-6-books",
];

export async function GET() {
  try {
    const apiKey = process.env.EMOJIAPI_CLIENT_ID;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not found" }, { status: 500 });
    }

    const emojiDict: Record<string, Emoji> = {};

    // Fetch each emoji individually
    for (const slug of curatedSlugs) {
      const res = await fetch(`https://emoji-api.com/emojis?access_key=${apiKey}&search=${slug}`);
      if (!res.ok) continue;

      const data: Emoji[] = await res.json();
      if (data.length > 0) {
        emojiDict[slug] = data[0]; // take first match
      }
    }

    return NextResponse.json(emojiDict);
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
