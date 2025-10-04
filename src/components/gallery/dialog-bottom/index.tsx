"use client";
import { cn } from "@/lib/cn";
import { Loader, Maximize2, Rocket } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { useState } from "react";

type DialogProps = {
  children: React.ReactNode;
};

export const DialogBottom = ({ children }: DialogProps) => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const modalVariant: Variants = {
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
    hide: {
      opacity: 0,
      scale: 0.95,
      y: 75,
    },
  };

  return (
    <>
      <motion.div className="">
        <motion.button
          className="bg-brand-500 dark:bg-brand-400 w-80 shadow-sm cursor-pointer text-white px-3 py-2 rounded-md flex flex-row items-center justify-center gap-3 transition-opacity duration-150 opacity-100 hover:opacity-80 "
          layoutId="action-button"
          onClick={() => setShow(!show)}
        >
          <Maximize2 size={18} />
          <span>Open Here</span>
        </motion.button>
      </motion.div>

      <motion.div
        className={cn(
          "overlay fixed inset-0 flex p-5 overflow-hidden bg-black/5 [backdrop-filter:blur(1px)]",
          !show && "pointer-events-none bg-black/0 [backdrop-filter:blur(0px)]"
        )}
        onClick={() => setShow(false)}
      >
        <AnimatePresence mode="popLayout">
          {show && (
            <motion.div
              role="dialog"
              variants={modalVariant}
              className="mt-auto mx-auto rounded-xl left-auto right-auto w-full max-w-xl gap-3 bg-gradient-to-b dark:from-calm-100 from-brand-100 from-0% via-calm-50 via-50% dark:to-calm-100 to-brand-200 to-110% border border-calm-200 shadow-lg flex flex-col justify-center items-center p-5"
              initial={"hide"}
              animate={"show"}
              exit={"hide"}
              style={{ pointerEvents: show ? "auto" : "none" }}
              transition={{
                type: "spring",
                bounce: 0.6,
                stiffness: 125,
                mass: 0.85,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
              <motion.div className="flex gap-4 w-full mt-auto">
                <motion.button
                  className="bg-calm-100 dark:bg-transparent flex-1 border border-brand-500 shadow-sm cursor-pointer text-brand-600 px-3 py-2 rounded-md transition-bg duration-150 dark:hover:bg-brand-100/40 hover:bg-brand-100"
                  onClick={() => setShow(false)}
                >
                  Close
                </motion.button>

                <motion.button
                  key="action-button"
                  layoutId="action-button"
                  className={
                    "bg-brand-500 dark:bg-brand-400 flex-1 shadow-sm cursor-pointer text-white px-3 py-2 rounded-md flex flex-row items-center justify-center gap-3 transition-opacity duration-150 opacity-100 hover:opacity-80" +
                    (loading ? " opacity-60 cursor-wait" : "")
                  }
                  disabled={loading}
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setLoading(false);
                      setShow(false);
                    }, 1000);
                  }}
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Rocket size={18} />
                      <span>Submit</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};
