"use client";
import { useEffect, useState } from "react";
import type { CountryInfo } from "@/app/types/CountryInfo";
import { useEmojis } from "@/hooks/useEmojis";

type HolidayObject = {
  date: string;
  localName?: string;
  name?: string;
};

function formatDateWithSuffix(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  // Create a "pure" local date without timezone shifting
  const date = new Date(year, month - 1, day);

  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

  return `${monthName} ${day}${suffix}`;
}

export default function Holidays() {
  const [data, setData] = useState<CountryInfo | null>(null);

  useEffect(() => {
    fetch("/api/country")
      .then((res) => res.json())
      .then((json: CountryInfo) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  const { emojis } = useEmojis();
  if (!data) return <p>Loading...</p>;

  const holidays = data.upcomingHolidays as HolidayObject[];

  return (
    <div
      role="public holidays card" 
      className="rounded-2xl bg-white shadow-xl text-[#374151] p-7 self-start border-4 border-black hover:outline-4 hover:outline-black">
      <div className="flex flex-row flex-nowrap items-center">
        {emojis["calendar"]?.character}
        <h2 className="text-sm font-bold uppercase pl-1">Upcoming Holidays</h2>
      </div>


      <ul className="text-sm pt-3">
        {holidays.map((holiday, idx) => (
          <li key={idx}>
            {formatDateWithSuffix(holiday.date)} — {holiday.localName ?? holiday.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
