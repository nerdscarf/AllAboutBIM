"use client";
import { useEmojis } from "@/hooks/useEmojis";
import { useUnsplash } from "../context/UnsplashContext";

export default function ApisUsed() {
  const { emojis } = useEmojis();

  const { portraitPhotos, landscapePhotos } = useUnsplash();
  const portPhotographersName = portraitPhotos?.[0]?.user?.name ?? "Unknown";
  const portPhotographersURL = portraitPhotos?.[0]?.user?.links?.html ?? "#";

  const landPhotographersName = landscapePhotos?.[0]?.user?.name ?? "Unknown";
  const landPhotographersURL = landscapePhotos?.[0]?.user?.links?.html ?? "#";

  return (
    <div className="rounded-2xl bg-white shadow-xl text-[#374151] p-7 text-sm self-start border-4 border-black hover:outline-4 hover:outline-black">
      <div className="flex flex-row flex-nowrap items-center">
        {emojis["e0-6-books"]?.character}
        <h1 className="text-sm font-bold uppercase pl-1">Resources Used</h1>
      </div>
      <ul className="py-3">
        <li className="hover:font-semibold">
          <a href="https://nextjs.org/" target="_blank">
            Next.js
          </a>{" "}
          with{" "}
          <a href="https://tailwindcss.com/" target="_blank">
            Tailwind Css
          </a>
        </li>
        <li className="hover:font-semibold">
          <a href="https://restcountries.com" target="_blank">
            REST Countries
          </a>
        </li>
        <li className="hover:font-semibold">
          <a href="https://date.nager.at/swagger/index.html" target="_blank">
            Nager.Date API - V3
          </a>
        </li>
        <li className="hover:font-semibold">
          <a href="https://emoji-api.com" target="_blank">
            Emoji API
          </a>
        </li>
        <li className="hover:font-semibold">
          <a href="https://unsplash.com/developers" target="_blank">
            Upsplash
          </a>
        </li>
        <li>
          Card Photo by{" "}
          <a
            href={`${portPhotographersURL}?utm_source=Country_Card&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:font-semibold"
          >
            {portPhotographersName}
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/?utm_source=Country_Card&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:font-semibold"
          >
            Unsplash
          </a>
        </li>
        <li>
          Background Photo by{" "}
          <a
            href={`${landPhotographersURL}?utm_source=Country_Card&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:font-semibold"
          >
            {landPhotographersName}
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/?utm_source=Country_Card&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:font-semibold"
          >
            Unsplash
          </a>
        </li>


        {/* <li><a href="https://github.com/factbook" target="_blank">The World Factbook</a></li>
        <li><a href="https://weatherapi.com" target="_blank">Weather API</a></li> */}
        {/* <li><a href="https://developer.spotify.com/" target="_blank">Spotify</a></li> */}
        {/* <li><a href="https://www.exchangerate-api.com" target="_blank">Rates By Exchange Rate API</a></li> */}
        {/*Photo by - Photographer Name From Unsplash - on Unsplash - Link: https://unsplash.com/?utm_source=your_app_name&utm_medium=referral -
        
        emoji-api.com
        emojiapi.dev
        openmoji.org
        img.icons8.com/history-book - img.icons8.com
        https://help.unsplash.com/en/articles/2511245-unsplash-api-guidelines
        https://www.youtube.com/watch?v=_AprVrgnq4w - Follow this guy on YT
        https://docs.imgix.com/en-US/apis/rendering/stylize/halftone - Stylize the image
        https://openmoji.org/
        */}
      </ul>
    </div>
  );
}
