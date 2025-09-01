import { NextResponse } from "next/server";
import type { WeatherInfo } from "@/app/types/Weather";

export async function GET() {
  const apiKey = process.env.WEATHER_API as string;

  try {
    const weatherApi = await fetch(
      "http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=Barbados&days=5&aqi=yes&alerts=yes"
    );

    const weatherData = await weatherApi.json();

    const currentTempC = weatherData.current.temp_c;
    const currentTempF = weatherData.current.temp_f;
    const currentCondition = (Object.values(weatherData.current.condition)) as [string, string, number];



    const result: WeatherInfo = {
      currentTempC,
      currentTempF,
      currentCondition,
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
