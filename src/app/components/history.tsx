"use client";
import { useEffect, useState } from "react";
import type { CountryInfo } from "@/app/types/CountryInfo";
import { useEmojis } from "@/hooks/useEmojis";
import Image from "next/image";

export default function History() {
  const [data, setData] = useState<CountryInfo | null>(null);

  useEffect(() => {
    fetch("/api/country")
      .then((res) => res.json())
      .then((json: CountryInfo) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const { emojis } = useEmojis();
  if (!data) return <p>Loading...</p>;

  return (
    <div className="rounded-2xl bg-white shadow-xl text-[#374151] p-7 self-start border-4 border-black hover:outline-4 hover:outline-black">
      <div className="flex justify-center pb-8">
          <Image
                src={data.coa}
                alt="Coat of arms of Barbados with shield, pelican, dolphin fish, sugar canes, and motto “Pride and Industry"
                className=""
                width={200}
                height={200}
                priority={true}
              /> 
      </div>
      <div className="flex flex-row flex-nowrap items-center">
        {emojis["hourglass-not-done"]?.character}
        <h1 className="text-sm font-bold uppercase pl-1">Brief History</h1>
      </div>
      <p className="text-sm py-3">{data.history}</p>
    </div>
  );
}
