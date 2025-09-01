"use client";
import { useEffect, useState } from "react";
import type { CountryInfo } from "@/app/types/CountryInfo";
import { useEmojis } from "@/hooks/useEmojis";

export default function ExchangeRate() {
  const [data, setData] = useState<CountryInfo | null>(null);

  useEffect(() => {
    fetch("/api/country")
      .then((res) => res.json())
      .then((json: CountryInfo) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const { emojis } = useEmojis();

  if (!data) return <p>Loading...</p>;

  // Integer and tow decimal places
  const cad = Math.trunc((data.cad as number) * 100) / 100;
  const euro = Math.trunc((data.eur as number) * 100) / 100;
  const usd = Math.trunc((data.usd as number) * 100) / 100;

  // Last Update Time
  const unixTimestamp = data?.lastUpdated;

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const formattedLastUpdate = unixTimestamp
  ? new Date(unixTimestamp * 1000).toLocaleString("en-US", options)
  : "Unknown";

  if (!data) return <p>Loading...</p>;

  return (
    <div className="rounded-2xl bg-white shadow-xl text-[#374151] p-7 self-start border-4 border-black hover:outline-4 hover:outline-black">
      <div className="flex flex-row flex-nowrap items-center">
        {emojis["e0-6-currency-exchange"]?.character}
        <h2 className="text-sm font-bold uppercase pl-1">Exchange Rates</h2>
      </div>
      <div className="text-sm">Last updated {formattedLastUpdate}</div>
      <div className="flex flex-row items-center justify-around py-3">
        <div className="flex flex-row">
        <p>
          <span className="pr-3">${data.bbd}</span>Barbados Dollar
        </p>
        </div>
        <span className="text-3xl">=</span>
        <div className="flex flex-col">
          <p>
            CAD<span className="text-sm pl-3">${cad}</span>
          </p>
          <p>
            Euro<span className="text-sm pl-3">${euro}</span>
          </p>
          <p>
            USD<span className="text-sm pl-3">${usd}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
