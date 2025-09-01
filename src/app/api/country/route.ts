import { NextResponse } from "next/server";
import type { CountryInfo } from "@/app/types/CountryInfo";

export async function GET() {
  try {
    // Call RestCountries API
    const countryRes = await fetch(
      "https://restcountries.com/v3.1/name/barbados"
    );
    const countryData = await countryRes.json();
    const country = countryData[0];
    const capital = country.capital?.[0] ?? "Unknown";
    const languages =
      (Object.values(country.languages) as string[])[0] ?? "Unknown";
    const coa = (Object.values(country.coatOfArms) as string[])[1] ?? "Unknown";
    const area = country.area;
    // const etymology = country.government["Country Name"].etymology.text;
    

    // CIA Factbook API
    const countryFactbook = await fetch(
      "https://raw.githubusercontent.com/factbook/factbook.json/master/central-america-n-caribbean/bb.json"
    );
    const countryFacts = await countryFactbook.json();
    const history =
      (Object.values(countryFacts.Introduction.Background) as string[])[0] ??
      "Unknown";
    const areaComparative = countryFacts.Geography["Area - comparative"].text;
    const climate = (Object.values(countryFacts.Geography.Climate) as string[])[0] ??
      "Unknown";
    const shortDescription = (Object.values(countryFacts.Geography.Location) as string[])[0] ??
    "Unknown";
    const longLat = countryFacts.Geography["Geographic coordinates"].text;
    const etymology = countryFacts.Government["Country name"].etymology.text;

    // Public Holidays API
    const holidayList = await fetch(
      "https://date.nager.at/api/v3/NextPublicHolidays/bb"
    );
    const holidays = await holidayList.json();
    const upcomingHolidays = holidays
      .slice(0, 3)
      .map((holiday: { date: string; localName?: string; name?: string }) => ({
        date: holiday.date,
        localName: holiday.localName ?? holiday.name,
      }));


    // Exchange Rate
    const exchangeRate = await fetch(
      "https://open.er-api.com/v6/latest/bbd"
    );
    const rates = await exchangeRate.json();
    const ex = rates.rates;
    const lastUpdated = rates.time_last_update_unix;

    // Shape data to match CountryInfo type
    const result: CountryInfo = {
      name: country.name.common,
      capital,
      continent: country.continents[0],
      population: country.population,
      flag: country.flag,
      map: country.maps.googleMaps,
      languages,
      history,
      upcomingHolidays,
      subregion: country.subregion,
      coa,
      area,
      areaComparative,
      climate,
      shortDescription,
      longLat,
      etymology,
      bbd: ex.BBD,
      cad: ex.CAD,
      eur: ex.EUR,
      usd: ex.USD,
      lastUpdated,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
