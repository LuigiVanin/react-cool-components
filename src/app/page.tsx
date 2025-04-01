
import PriceCard from "@/components/Gallery/PriceCard";
import GalleryCard from "@/components/Gallery/GalleryCard";
import { TvIcon } from "lucide-react";

export default function Home() {
  const items = [
    {
      text: 'Real-Time Market Data',
    },
    {
      text: 'Advanced Chart Tools'
    },
    {
      text: 'On Chain Analysis'
    },
    {
      text: 'API Access'
    },
  ]

  return (
    <main className="w-full min-h-full flex gap-5 items-center justify-center p-5 bg-background">
      {/* <PriceCard value={29} items={items} /> */}
      <GalleryCard className="flex flex-col items-center justify-start gap-2 w-96 h-72 cursor-pointer">
        <div className="w-full py-7 flex items-center justify-center bg-calm-300/20 rounded-2xl">
          <TvIcon className="w-16 h-16 text-primary" />
        </div>
        <div className="flex flex-col gap-2 flex-1 py-3">
          <h1 className="text-3xl font-bold">Welcome to our Gallery</h1>
          <p className="text-sm text-muted-foreground">Explore our collection of stunning artworks.</p>
        </div>
      </GalleryCard>
      <GalleryCard className="w-96 h-72" />

    </main>
  );
}
