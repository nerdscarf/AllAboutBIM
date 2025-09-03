"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { CountryInfo } from "@/app/types/CountryInfo";
import { useUnsplash } from "../context/UnsplashContext";
import { useFloating, useHover, useInteractions, offset } from '@floating-ui/react';

export default function BasicInfo() {
  const [data, setData] = useState<CountryInfo | null>(null);
  const { portraitPhotos } = useUnsplash();

  useEffect(() => {
    fetch("/api/country")
      .then((res) => res.json())
      .then((json: CountryInfo) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  //Floating Info Effect
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(5)],
    placement: 'top-start',
  });

  const hover = useHover(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  // Format Etymology
  const rawText = data?.etymology || '';

  function formatText(text: string): string {
    // 1. Remove <em> and </em> tags
    let cleaned = text.replace(/<[^>]+>/g, '');

    // 2. Capitalize the first letter (if text is not empty)
    if (cleaned.length > 0) {
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }

    return cleaned;
  }

  const formattedText = formatText(rawText);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden border-4 border-black  hover:outline-4 hover:outline-black">
      <Image
        src={portraitPhotos[0].urls.small}
        alt={portraitPhotos[0].alt_description ?? "Photo from Unsplash"}
        className=""
        fill
        priority
      /> 
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      <div className="absolute bottom-6 left-6">
        {isOpen && (
        <div
          className="floating bg-white text-black text-sm p-2 rounded container"
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {formattedText}.
        </div>
      )}
        <h1 className="uppercase text-white font-bold text-3xl" ref={refs.setReference} {...getReferenceProps()}>{data.name}</h1>
        <h2 className="text-sm text-white">{data.continent} — {data.subregion}</h2>
        {data.map ? <a href={data.map} target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:font-bold">{data.longLat}</a> : "N/A"}
      </div>
    </div>
  );
}