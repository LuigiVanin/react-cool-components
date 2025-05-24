"use client"
import { cn } from "@/lib/cn";
import { CheckIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useMemo, useRef, useState } from "react";


type MultyStepTabProps = {
  tabs: React.ReactNode[];
  currentTab: number;
  className?: string;
  onStepClick?: (index: number) => void;
}

const MultiStepTab: React.FC<MultyStepTabProps> = ({ className, tabs, currentTab, onStepClick }) => {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [contentHeight, setContentHeight] = useState<number>(0);

  const tabsContent = useMemo(() => {
    return tabs;
  }, [tabs])



  const currentTabIndex = useMemo(() => {
    if (currentTab < 0) return 0;
    if (currentTab > tabsContent.length - 1) return tabsContent.length - 1;

    return currentTab;
  }, [currentTab, tabsContent.length]);

  const [tabIndexCache, setTabIndexCache] = useState<number[]>([currentTabIndex]);
  const dTabIndex = useMemo(() => tabIndexCache[1] - tabIndexCache[0], [tabIndexCache]);

  useEffect(() => {
    const tabCacheLast = tabIndexCache[tabIndexCache.length - 1];
    setTabIndexCache([tabCacheLast, currentTabIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTabIndex]);

  const currentProgressOffset = useMemo(
    () => `${100 / (tabsContent.length * 2)}%`,
    [tabsContent.length]
  );

  const currentProgressWidth = useMemo(
    () => `${100 * ((currentTabIndex) / tabsContent.length)}%`,
    [currentTabIndex, tabsContent.length]
  );


  return (
    <div className={cn("flex flex-col w-full min-h-48 items-center justify-start bg-calm-100 rounded-xl border border-calm-200/65 shadow-xs dark:shadow-calm-400/25", className)}>
      <header className="w-full px-3 py-2 gap-4 flex items-center justify-around bg-calm-200/50 rounded-t-xl relative">
        <motion.span
          className="line absolute dark:bg-white bg-black h-[2px] rounded-full"
          animate={{ width: currentProgressWidth, left: currentProgressOffset }}
          transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
        />
        {
          tabsContent.map((_, index) => (
            <motion.button
              key={index}
              className={cn(
                `h-11 w-11 cursor-pointer rounded-full border border-calm-100 bg-calm-200/50 font-semibold text-calm-600 hover:text-calm-900 transition-all duration-200 flex-center relative`,
                currentTabIndex > index && 'bg-calm-300',
                currentTabIndex === index && 'border-2 border-calm-700 bg-calm-200',
              )}
              onClick={() => onStepClick && onStepClick(index)}
            >
              <AnimatePresence mode="wait">
                {currentTabIndex > index || currentTab >= tabsContent.length ? (
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
                    {index + 1}
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
            index === currentTabIndex &&
            (
              <motion.div
                key={index}
                className={cn(`w-full h-auto flex-start text-calm-900 font-semibold text-xl`)}
                initial={{ opacity: 0, x: dTabIndex > 0 ? "60%" : "-50%" }}
                exit={{ opacity: 0, x: dTabIndex > 0 ? "-60%" : "50%" }}
                animate={{ opacity: 1, x: "0%" }}
                transition={{ duration: 0.25 }}
              >
                <motion.div
                  className="h-auto w-full"
                  ref={(el) => {
                    if (el?.offsetHeight !== undefined) {
                      setContentHeight(el?.offsetHeight || 0);
                      contentRefs.current[index] = el;
                    }
                  }}
                >
                  {tab}
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