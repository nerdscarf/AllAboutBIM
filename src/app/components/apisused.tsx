"use client";
import { useEmojis } from "@/hooks/useEmojis";

export default function ApisUsed() {
  const { emojis } = useEmojis();

  return (
    <div className="rounded-2xl bg-white shadow-xl text-[#374151] p-7 text-sm self-start border-4 border-black hover:outline-4 hover:outline-black min-w-max">
      <div className="flex flex-row flex-nowrap items-center">
        {emojis["e0-6-books"]?.character}
      <h1 className="text-sm font-bold uppercase pl-1">Resources Used</h1>
      </div>
      <ul className="py-3">
        <li className="hover:font-semibold"><a href="https://nextjs.org/" target="_blank">Next.js</a> with <a href="tailwindcss.com" target="_blank">Tailwind Css</a></li>
        <li className="hover:font-semibold"><a href="https://restcountries.com" target="_blank">REST Countries</a></li>
        {/* <li><a href="https://github.com/factbook" target="_blank">The World Factbook</a></li>
        <li><a href="https://weatherapi.com" target="_blank">Weather API</a></li> */}
        <li className="hover:font-semibold"><a href="https://date.nager.at/swagger/index.html" target="_blank">Nager.Date API - V3</a></li>
        {/* <li><a href="https://developer.spotify.com/" target="_blank">Spotify</a></li> */}
        <li className="hover:font-semibold"><a href="https://unsplash.com/developers" target="_blank">Upsplash</a></li>
        <li className="hover:font-semibold"><a href="https://emoji-api.com" target="_blank">Emoji API</a></li>
        {/* <li><a href="https://www.exchangerate-api.com" target="_blank">Rates By Exchange Rate API</a></li> */}
        
        {/*Photo by - Photographer Name From Unsplash - on Unsplash - Link: https://unsplash.com/?utm_source=your_app_name&utm_medium=referral -
        
        emoji-api.com
        emojiapi.dev
        openmoji.org
        img.icons8.com/history-book - img.icons8.com
        https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
        https://www.youtube.com/watch?v=_AprVrgnq4w - Follow this guy on YT
        https://docs.imgix.com/en-US/apis/rendering/stylize/halftone - Stilize the image
        https://openmoji.org/
        */}
      </ul>
    </div>
  );
}
