import PriceCard from "@/components/gallery/price-card";
import { ArrowUp } from "lucide-react";

export default function PriceCardPage() {
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

  const value = 29

  return (
    <main className="w-full min-h-full flex gap-5 items-center justify-center p-5">
      <PriceCard
        actionSlot={
          <PriceCard.Action className="group/btn">
            <span className="group-hover/btn:underline underline-offset-4">
              Upgrade to Business
            </span>
            <ArrowUp
              size={20}
              className="rotate-90 transition-transform duration-300 group-hover/btn:translate-x-1"
            />
          </PriceCard.Action>
        }
      >
        <PriceCard.Header>
          <PriceCard.Title
            className="z-10"
            title="Business"
            subtitle="Billed Yearly"
          />
          <PriceCard.Badge />
        </PriceCard.Header>

        <PriceCard.Divider />

        <PriceCard.Body>
          <p className="font-semibold">Includes</p>

          <PriceCard.Features>
            {items.map((item, index) => (
              <PriceCard.FeatureItem key={index} text={item.text} />
            ))}
          </PriceCard.Features>
        </PriceCard.Body>

        <PriceCard.Price value={value} description="per user / month" />

      </PriceCard>
    </main>
  );
}