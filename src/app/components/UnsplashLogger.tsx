"use client";

import { useEffect } from "react";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
});

const UnsplashLogger: React.FC = () => {
  useEffect(() => {
    api.search
      .getPhotos({ query: "cat", orientation: "landscape" })
      .then(result => {
        console.log("Unsplash API result:", result);
      })
      .catch(err => {
        console.error("Something went wrong!", err);
      });
  }, []);

  return <div className="rounded-2xl bg-white shadow-xl text-[#374151] p-3 self-start">Check the console for Unsplash API results</div>;
};

export default UnsplashLogger;
