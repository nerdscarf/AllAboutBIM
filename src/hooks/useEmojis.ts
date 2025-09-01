"use client";
import { useEffect, useState } from "react";
import type { Emoji } from "@/app/types/emoji";

export function useEmojis() {
  const [emojis, setEmojis] = useState<Record<string, Emoji>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await fetch("/api/emojis");
        const data: Record<string, Emoji> = await res.json();
        setEmojis(data);
      } catch (err) {
        console.error("Failed to load emojis:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmojis();
  }, []);

  return { emojis, loading };
}
