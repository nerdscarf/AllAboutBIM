"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createApi } from "unsplash-js";
import type { Basic } from "unsplash-js/dist/methods/photos/types";

const api = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY as string,
});

type UnsplashContextType = {
  landscapePhotos: Basic[];
  portraitPhotos: Basic[];
};

const UnsplashContext = createContext<UnsplashContextType | undefined>(undefined);

export function UnsplashProvider({ children }: { children: ReactNode }) {
  const [landscapePhotos, setLandscapePhotos] = useState<Basic[]>([]);
  const [portraitPhotos, setPortraitPhotos] = useState<Basic[]>([]);

  useEffect(() => {
    api.search
      .getPhotos({ query: "Barbados", orientation: "landscape" })
      .then(result => {
        if (result.response?.results) setLandscapePhotos(result.response.results);
      })
      .catch(err => console.error(err));

    api.search
      .getPhotos({ query: "Barbados", orientation: "portrait" })
      .then(result => {
        if (result.response?.results) setPortraitPhotos(result.response.results);
      })
      .catch(err => console.error(err));
  }, []);

  return (
  <UnsplashContext.Provider value={{ landscapePhotos, portraitPhotos }}>
    {children}
  </UnsplashContext.Provider>
);
}

export function useUnsplash() {
  const context = useContext(UnsplashContext);
  if (!context) {
    throw new Error("useUnsplash must be used within an UnsplashProvider");
  }
  return context;
}
