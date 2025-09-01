"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useEmojis } from "@/hooks/useEmojis";

type Artist = {
  id: string;
  name: string;
  image: string;
  url: string;
  followers: string;
};

type SpotifyArtist = {
  id: string;
  name: string;
  images: { url: string }[];
  popularity: number;
  genres: string[];
  external_urls: { spotify: string };
  followers: {total: string};
};

export default function Spotify() {
  const [accessToken, setAccessToken] = useState<string>("");
  const [artists, setArtists] = useState<Artist[]>([]);

  // Fetch Spotify token
  useEffect(() => {
    fetch("/api/spotify-token")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error("Failed to fetch token: " + text);
        }
        return res.json();
      })
      .then((data) => setAccessToken(data.access_token))
      .catch((err) => console.error(err));
  }, []);

  // Fetch artists using Search API
  useEffect(() => {
    if (!accessToken) return;

    async function fetchTopArtists() {
      const query = encodeURIComponent("bajan soca");
      const url = `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();

      if (!data.artists?.items?.length) {
        console.error("No artists found", data);
        return;
      }

   const topArtists: Artist[] = data.artists.items
  .filter((artist: SpotifyArtist) => artist.genres?.includes("soca"))
  .sort((a: SpotifyArtist, b: SpotifyArtist) => b.popularity - a.popularity)
  .slice(0, 6)

  .map((artist: SpotifyArtist) => ({
    id: artist.id,
    name: artist.name,
    image: artist.images?.[0]?.url || "https://via.placeholder.com/200",
    url: artist.external_urls.spotify,
    followers: artist.followers.total
  }));

      setArtists(topArtists);
    }

    fetchTopArtists();
  }, [accessToken]);

  const { emojis } = useEmojis();


  return (
    <div className="rounded-2xl bg-white shadow-xl text-[#374151] p-7 self-start border-4 border-black hover:outline-4 hover:outline-black">
      <div className="flex flex-row flex-nowrap items-center">
        {emojis["headphone"]?.character}
        <h1 className="text-sm font-bold uppercase pl-1">Popular Artists</h1>
      </div>
      <div className="grid grid-cols-2 py-3 gap-y-5 gap-x-3">
        {artists.map((artist) => (
          <div key={artist.id} className="border rounded-md p-2 hover:border-gray-300">
            <a href={artist.url} target="_blank">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  className="aspect-square object-cover rounded-md"
                  width={500}
                  height={500}
                  priority={true}
                />
            <div className="text-sm flex flex-row justify-between pt-1 items-baseline">
              <h3 className="">{artist.name}</h3>
              <div className="flex flex-row flex-nowrap">
                {emojis["e1-0-busts-in-silhouette"]?.character}
              <h4 className="pl-1">{artist.followers}</h4>
              </div>
            </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


// To Do - Add commas to numbers, min size for cards on resizing, I don't like how the names change while resizing, add: based on spotify follower count
