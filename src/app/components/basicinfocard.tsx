"use client";
import { useEffect, useState } from "react";
import type { CountryInfo } from "@/app/types/CountryInfo";
import { useEmojis } from "@/hooks/useEmojis";


export default function BasicInfoCard() {
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
        <div className="flex flex-row flex-nowrap items-center">
        {data.flag} 
        <h1 className="text-sm font-bold uppercase pl-1">Basic Information</h1>
      </div>
      <div className="flex flex-row flex-nowrap text-sm">
       <p>{emojis["e1-0-busts-in-silhouette"]?.character} {data.population.toLocaleString()}</p>
      </div><br/>
       <div className="text-sm">{data.shortDescription} <br/>
       <p>{data.languages} </p>
      <br/>
     {data.area} sq km  — {data.areaComparative}
      </div>
    </div>
  );
}

// To Do: Add alt text of flag description (Country)