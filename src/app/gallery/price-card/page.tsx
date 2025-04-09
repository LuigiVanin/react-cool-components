import PriceCard from "@/components/Gallery/PriceCard";

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

  return (
    <main className="w-full min-h-full flex gap-5 items-center justify-center p-5 bg-background">
      <PriceCard
        value={29}
        items={items}
      />
    </main>
  );
}