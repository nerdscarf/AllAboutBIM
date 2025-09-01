"use client";
import { useEffect, useState } from "react";
import type { RedditInfo } from "@/app/types/RedditInfo";
import { useEmojis } from "@/hooks/useEmojis";

interface Post {
  title: string;
  url: string;
}

// interface Data {
//   posts: Post[];
// }

export default function RedditInfoCard() {
  const [data, setData] = useState<RedditInfo | null>(null);

  useEffect(() => {
    fetch("/api/reddit")
      .then((res) => res.json())
      .then((json: RedditInfo) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const { emojis } = useEmojis();
  if (!data) return <p>Loading...</p>;

  return (
    <div className="rounded-2xl bg-white shadow-xl text-[#374151] p-7 self-start border-4 border-black hover:outline-4 hover:outline-black">
      <div className="flex flex-row flex-nowrap items-center">
        {emojis["e0-6-information"]?.character}
        <h1 className="text-sm font-bold uppercase pl-1">
          Reddit — {data.subName}
        </h1>
      </div>
      <ul className="text-sm pt-3">
        {data.posts.map((post: Post, idx: number, upvotes: number) => (
          <li key={idx} className="m-1 rounded-md ">
            <div className="flex flex-row items-center py-2">
              <div className="flex flex-col flex-nowrap">
                {emojis["e0-6-thumbs-up"]?.character}
                <div>{post.upvotes}</div>
              </div>
              <a href={`https://reddit.com${post.url}`} target="_blank" className="pl-2">
                {post.title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// https://www.reddit.com/r/barbados/top.json?limit=5&t=month

// To Do: map the json object so that the title of each post is a link to it, link title to r/barbados
