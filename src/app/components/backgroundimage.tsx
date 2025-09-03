"use client";

import { useUnsplash } from "../context/UnsplashContext";

export default function Background({ children }: { children: React.ReactNode }) {
  const { landscapePhotos } = useUnsplash();
  const fullImageUrl = landscapePhotos?.[0]?.urls?.full;

  // Build full URL only if photo exists
  const backgroundUrl = fullImageUrl
    ? `${fullImageUrl}&blur=600&htn=30`
    : "";

  return (
    <div
      role="background image"
      className="min-h-screen w-full bg-cover bg-center"
      style={backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {}}
    >
      {children}
    </div>
  );
}
