import BasicInfo from "@/app/components/basicinfo";
import ApisUsed from "./components/apisused";
import History from "./components/history";
import Weather from "./components/weather";
import Holidays from "./components/publicholiday";
import Spotify from './components/spotify';
import BasicInfoCard from "./components/basicinfocard";
import RedditInfoCard from "./components/reddit";
import ExchangeRate from "./components/exchangerate";

export default function Home() {
  return (
   <div className="min-h-screen p-8">
  <div className="max-w-7xl mx-auto">
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
      <div className="break-inside-avoid py-4 px-3">
        <BasicInfo />
      </div>
      {/* <div className="break-inside-avoid py-4 px-3">
        <BasicInfoCard/>
      </div>
      <div className="break-inside-avoid py-4 px-3">
        <History />
      </div>
      <div className="break-inside-avoid py-4 px-3">
        <ExchangeRate />
      </div>
      <div className="break-inside-avoid py-4 px-3">
        <Weather />
      </div> */}
      <div className="break-inside-avoid py-4 px-3">
        <Holidays />
      </div>
      {/* <div className="break-inside-avoid py-4 px-3">
        <Spotify />
      </div>
      <div className="break-inside-avoid py-4 px-3">
        <RedditInfoCard />
      </div> */}

     {/*  <div className="break-inside-avoid py-4 px-3">
      <UnsplashLogger />
      </div>*/}
      <div className="break-inside-avoid py-4 px-3">
        <ApisUsed />
      </div> 
    </div>
  </div>
</div>
  );
}


// https://nerdcave.com/tailwind-cheat-sheet
// https://tailwindcss.com/docs/
// https://raw.githubusercontent.com/factbook/factbook.json/master/central-america-n-caribbean/bb.json
// https://codebeautify.org/jsonviewer