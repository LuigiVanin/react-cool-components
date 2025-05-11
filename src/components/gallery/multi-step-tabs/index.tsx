"use client"
import { cn } from "@/lib/cn";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const MultiStepTab = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = useMemo(() => {
    return Array.from({ length: 3 }, (_, index) => ({ text: String(index + 1), index }));
  }, [])

  console.log("tabs: ", tabs);

  return (
    <div className="flex flex-col w-96 h-48 items-center justify-start bg-calm-100 rounded-xl border border-calm-200/65 shadow shadow-calm-400/25">
      <header className="w-full h-16 px-3 gap-4 flex items-center justify-around bg-calm-200/50 rounded-t-xl">
        {
          tabs.map((tab) => (
            <button
              key={tab.index}
              className={cn(`h-11 w-11 cursor-pointer rounded-full border border-calm-100 bg-calm-200/50 font-semibold text-calm-600 hover:text-calm-900 transition-all duration-200 flex-center relative`, currentTab > tab.index && 'bg-calm-300')}
              onClick={() => setCurrentTab(tab.index)}
            >
              <AnimatePresence >
                {
                  currentTab > tab.index && (
                    <motion.span
                      className="absolute inset-0 rounded-full flex-center"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <CheckIcon size={20} />
                    </motion.span>
                  )
                }
              </AnimatePresence>
              <AnimatePresence  >
                {
                  currentTab <= tab.index && (
                    <motion.span
                      className="absolute inset-0 rounded-full flex-center"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {tab.text}
                    </motion.span>
                  )
                }
              </AnimatePresence>

            </button>
          ))
        }
      </header>
    </div>
  );
}

export {
  MultiStepTab
}