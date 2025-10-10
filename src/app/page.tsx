import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full min-h-full flex gap-5 items-center justify-center p-5 ">
      <div className="flex flex-col justify-center items-center gap-4 text-foreground">
        <Link
          href="/gallery/gallery-card"
          className="underline underline-offset-4"
        >
          Gallery Card Component
        </Link>

        <Link
          href="/gallery/price-card"
          className="underline underline-offset-4"
        >
          Price Card Component
        </Link>

        <Link
          href="/gallery/magnified-dock"
          className="underline underline-offset-4"
        >
          Magnified Dock Component
        </Link>

        <Link
          href="/gallery/speed-slider"
          className="underline underline-offset-4"
        >
          Speed Slider Component
        </Link>

        <Link
          href="/gallery/swipe-action"
          className="underline underline-offset-4"
        >
          Swipe Action Component
        </Link>

        <Link
          href="/gallery/multi-step-tabs"
          className="underline underline-offset-4"
        >
          Multi Step Tabs Component
        </Link>

        <Link href="/gallery/skeleton" className="underline underline-offset-4">
          Skeleton Component
        </Link>

        <Link
          href="/gallery/multi-value-input"
          className="underline underline-offset-4"
        >
          Multi Value Input Component
        </Link>

        <Link
          href="/gallery/light-effect"
          className="underline underline-offset-4"
        >
          Light Effect Component
        </Link>

        <Link
          href="/gallery/text-split"
          className="underline underline-offset-4"
        >
          Text Split Component
        </Link>

        <Link
          href="/gallery/dialog-bottom"
          className="underline underline-offset-4"
        >
          Bottom Dialog Component
        </Link>

        <Link
          href="/gallery/checkbox"
          className="underline underline-offset-4"
        >
          Checkbox Component
        </Link>


      </div>
    </main>
  );
}
