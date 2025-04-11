import Link from "next/link";

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

      <div className="flex flex-col justify-center items-center gap-4 text-foreground">
        <Link href="/gallery/gallery-card" className="underline underline-offset-4">
          Gallery Card Component
        </Link>

        <Link href="/gallery/price-card" className="underline underline-offset-4">
          Price Card Component
        </Link>

        <Link href="/gallery/magnified-dock" className="underline underline-offset-4">
          Magnified Dock Component
        </Link>
      </div>
    </main>
  );
}
