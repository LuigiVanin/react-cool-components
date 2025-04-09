import { GalleryCard, GalleryCardBody, GalleryCardHeader } from "@/components/Gallery/GalleryCard";
import { TvIcon } from "lucide-react";

export default function GalleryCardPage() {

  return (
    <main className="w-full min-h-full flex gap-5 items-center justify-center p-5 bg-background">
      <GalleryCard className="flex flex-col items-center justify-start gap-2 w-96 h-72 cursor-pointer">
        <GalleryCardHeader>
          <TvIcon className="w-16 h-16 text-primary" />
        </GalleryCardHeader>
        <GalleryCardBody>
          <h1 className="text-3xl font-bold">Welcome to our Gallery</h1>
          <p className="text-sm text-muted-foreground">Explore our collection of stunning artworks.</p>
        </GalleryCardBody>
      </GalleryCard>
    </main>
  );
}
