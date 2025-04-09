import { Star, Check, ArrowUp } from "lucide-react";

export type PriceCardProps = {
  value: number;
  items: { text: string }[];
}

const PriceCard = (props: PriceCardProps) => {

  return (
    <div className="group/card wrapper w-80 relative rounded-3xl bg-gradient-to-bl  from-green-700 to-80% to-green-500 ">
      <div className="w-full min-h-32 p-6 bg-convergent shadow-card rounded-3xl border-l border-r border-gray-200 dark:border-gray-800 flex flex-col gap-6 relative">

        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <span className="group-hover/card:translate-y-15 ease-in-out group-hover/card:-translate-x-5 transition-transform duration-500 absolute z-0 right-5 -top-16 rounded-[100%] w-28 h-36 bg-green-200 dark:bg-green-800 rotate-[-70deg] blur-3xl" />
        </div>

        <PriceCardHeader />

        <span className="w-full h-[1px] bg-calm-300 flex z-10" />

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Includes</p>

          <ul className="flex flex-col gap-3">

            {props.items.map((item, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <span className="flex items-center justify-center dark:bg-green-800  bg-green-100 dark:text-green-400 text-green-600 rounded-full h-5 w-5">
                  <Check size={13} strokeWidth={3} />

                </span>
                <p className="text-gray-400 font-medium hover:underline hover:decoration-dashed hover:underline-offset-4">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <footer className="">
          <h3 className="font-semibold text-xl text-foreground">${props.value}</h3>
          <p className="text-gray-400 font-medium">per user / month</p>
        </footer>
      </div>

      <PriceCardAction />
    </div>
  );
}

const PriceCardAction = () => {
  return (
    <button className="w-full  py-4 font-medium flex justify-center items-center gap-1 cursor-pointer relative group/btn transition-transform duration-150 text-white">
      <span className="group-hover/btn:underline underline-offset-4">Upgrade to Business</span>
      <ArrowUp size={20} className="rotate-90 transition-transform duration-300 group-hover/btn:translate-x-1" />

      <span className="absolute size-[2px] bg-white top-3 left-9"></span>
      <span className="absolute size-[1px] bg-white top-5 left-4"></span>
      <span className="absolute size-[1px] bg-white top-8 left-6"></span>
      <span className="absolute size-[1px] bg-white top-10 left-12"></span>
      <span className="absolute size-[1px] bg-white bottom-3 left-3"></span>

      <span className="absolute size-[1px] bg-white top-5 right-4"></span>
      <span className="absolute size-[1px] bg-white top-8 right-6"></span>
      <span className="absolute size-[1px] bg-white top-10 right-12"></span>
      <span className="absolute size-[2px] bg-white opacity-70 top-5 right-11"></span>
      <span className="absolute size-[2px] bg-white top-2 right-8"></span>
    </button>
  )
}

const PriceCardHeader = () => {
  return (
    <header className="flex justify-between items-start">
      <div className="flex flex-col">
        <h3 className="text-xl font-semibold text-foreground">Business</h3>
        <p className="text-neutral-400 font-semibold text-sm">Billed Yearly</p>
      </div>

      <div className="flex items-center gap-1 border-1 border-gray-100 dark:border-gray-700 pr-3 pl-[2px] py-[2px] rounded-full z-10 bg-convergent">
        <span className="h-6 w-6 bg-green-400 text-white rounded-full flex items-center justify-center">
          <Star size={13} fill="currentColor" />
        </span>
        <p className="uppercase text-sm text-green-500 font-medium">Popular</p>
      </div>
    </header>
  )
}

export default PriceCard; 