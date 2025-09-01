import { NextResponse } from "next/server";
import type { RedditInfo } from "@/app/types/RedditInfo";

export async function GET() {
  try {
    const redditRes = await fetch(
      "https://www.reddit.com/r/barbados/top.json?limit=8&t=month"
    );
    const redditData = await redditRes.json();
    const test = redditData.data.children;
    const subName = redditData.data.children[0].data.subreddit_name_prefixed;

    const posts = test.map(
      (post: { data: { title: string; ups: number; permalink: string } }) => ({
        title: post.data.title,
        upvotes: post.data.ups,
        url: post.data.permalink,
      })
    );

    // Shape data to match CountryInfo type
    const result: RedditInfo = {
      // test,
      posts,
      subName,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
