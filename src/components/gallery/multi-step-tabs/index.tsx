"use client"
import { cn } from "@/lib/cn";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useRef, useState } from "react";

const MultiStepTab = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = useMemo(() => {
    return Array.from({ length: 3 }, (_, index) => ({ text: String(index + 1), index }));
  }, [])

  const tabsContent = useMemo(() => {
    return Array.from({ length: 3 }, (_, index) => ({ text: `Content ${index + 1}`, index }));
  }, [])

  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [contentHeight, setContentHeight] = useState<number>(0);

  return (
    <div className="flex flex-col w-96 min-h-48 items-center justify-start bg-calm-100 rounded-xl border border-calm-200/65 shadow-xs dark:shadow-calm-400/25">
      <header className="w-full px-3 py-2 gap-4 flex items-center justify-around bg-calm-200/50 rounded-t-xl">
        {
          tabs.map((tab) => (
            <motion.button
              key={tab.index}
              className={cn(
                `h-11 w-11 cursor-pointer rounded-full border border-calm-100 bg-calm-200/50 font-semibold text-calm-600 hover:text-calm-900 transition-all duration-200 flex-center relative`,
                currentTab > tab.index && 'bg-calm-300',
                currentTab === tab.index && 'border-2 border-calm-700 bg-calm-200',
              )}
              onClick={() => setCurrentTab(tab.index)}
            >
              <AnimatePresence mode="wait">
                {currentTab > tab.index ? (
                  <motion.span
                    key="check"
                    className="flex-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckIcon size={20} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="text"
                    className="flex-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.text}
                  </motion.span>
                )}
              </AnimatePresence>

            </motion.button>
          ))
        }
      </header>

      <motion.main
        className="w-full overflow-x-hidden flex flex-row overflow-y-hidden"
        animate={{ height: contentHeight }}
        transition={{ duration: 0.22, type: "spring", stiffness: 85 }}
        style={{ height: !contentHeight ? "auto" : contentHeight }}
      >
        <AnimatePresence mode="wait">
          {tabsContent.map((tab, index) =>
            index === currentTab &&
            (
              <motion.div
                key={tab.index}
                className={cn(`w-full h-auto flex-start text-calm-900 font-semibold text-xl`)}
                initial={{ opacity: 0, x: "60%" }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 0, x: "-50%" }}
                transition={{ duration: 0.25 }}
              >
                <motion.div
                  className="h-auto w-full"
                  ref={(el) => {
                    if (el?.offsetHeight !== contentHeight)
                      setContentHeight(el?.offsetHeight || 0);
                    contentRefs.current[index] = el;
                  }}
                >
                  <motion.div
                    className={cn(
                      "p-4",
                      currentTab === 0 && 'h-40',
                      currentTab === 1 && 'h-64',
                      currentTab === 2 && 'h-96'
                    )}

                  >
                    {tab.text}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

export {
  MultiStepTab
}