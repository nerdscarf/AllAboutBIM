"use client";
import { useEffect, useState } from "react";
import type { RedditInfo, Post } from "@/app/types/RedditInfo"; // ✅ import fixed
import { useEmojis } from "@/hooks/useEmojis";

export default function RedditInfoCard() {
  const [data, setData] = useState<RedditInfo | null>(null);
  const { emojis } = useEmojis();

  useEffect(() => {
    fetch("/api/reddit")
      .then((res) => res.json())
      .then((json: RedditInfo) => setData(json))
      .catch((err) => console.error(err));
  }, []);

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
        {data.posts.map((post: Post, idx: number) => (
          <li key={idx} className="m-1 rounded-md">
            <div className="flex flex-row items-center py-2">
              <div className="flex flex-col flex-nowrap items-center pr-2">
                <span>{emojis["e0-6-thumbs-up"]?.character}</span>
                <div>{post.upvotes}</div>
              </div>
              <a
                href={`https://reddit.com${post.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-2 underline hover:text-blue-600"
              >
                {post.title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
