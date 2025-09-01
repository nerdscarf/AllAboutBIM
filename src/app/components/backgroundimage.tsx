"use client";

import { useUnsplash } from "../context/UnsplashContext";

export default function Background({ children }: { children: React.ReactNode }) {
  const { landscapePhotos } = useUnsplash();
  const backgroundUrl = landscapePhotos[0]?.urls?.full ?? "";

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundUrl}&blur=600&htn=30)` }}
    >
      {children}
    </div>
  );
}
