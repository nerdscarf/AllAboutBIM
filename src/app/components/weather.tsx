"use client";
import { useEffect, useState } from "react";
import type { WeatherInfo } from "@/app/types/Weather";
import { useEmojis } from "@/hooks/useEmojis";
import Image from "next/image";

export default function Weather() {
  const [data, setData] = useState<WeatherInfo | null>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then((res) => res.json())
      .then((json: WeatherInfo) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const { emojis } = useEmojis();

  if (!data) return <p>Loading...</p>;

  const cTempC = Math.trunc(data.currentTempC);
  const cTempF = Math.trunc(data.currentTempF);

  const currentConditionText = data.currentCondition[0];
  const currentConditionIcon = data.currentCondition[1];
  
  return (
    <div className="rounded-2xl bg-white shadow-xl text-[#374151] p-7 self-start border-4 border-black hover:outline-4 hover:outline-black">
      <div className="flex flex-row flex-nowrap items-center">
        {emojis["e0-7-thermometer"]?.character}
        <h1 className="text-sm font-bold uppercase pl-1">Weather</h1>
      </div>

      <div className="flex flex-row justify-evenly items-center py-3">
        <div className="flex flex-col">
          <div className="flex flex-row text-3xl">
            {cTempC} C&deg; / {cTempF} F&deg;
          </div>
          <Image
            src={`https:${currentConditionIcon}`}
            alt={currentConditionText as string}
            className=""
            width={50}
            height={50}
            priority={true}
          />
          <div className="text-sm">{currentConditionText}</div>
        </div>
        <div className="upcoming flex flex-col text-sml">
          <ul>
            <li><span className="font-extrabold">90&deg;</span> - Sunny</li>
            <li><span className="font-extrabold">83&deg;</span> - Windy</li>
            <li><span className="font-extrabold">70&deg;</span> - Rain</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// To Do:

// https://www.weatherapi.com/docs/
// https://api.weatherapi.com/v1/forecast.json?key=704a1c9511a3401787e221103252008&q=Barbados&days=5&aqi=yes&alerts=yes
// https://www.weatherapi.com/api-explorer.aspx#forecast
