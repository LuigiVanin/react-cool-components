"use client";
import LightEffect from "@/components/gallery/light-effect";
import { motion } from "motion/react";

const LightEffectPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <LightEffect className="-z-10" />


      <motion.h1
        className="text-4xl font-bold bg-clip-text bg-gradient-to-t from-calm-300/75 -from-15% dark:from-calm-400/50 to-90% dark:to-calm-600 to-calm-700 text-transparent leading-15"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3, type: "spring", mass: 0.8, stiffness: 250, damping: 10 }}
      >
        Cool Light Effect
      </motion.h1>

      <motion.p
        className="text-transparent mb-4 position-relative text-center max-w-xl
  bg-gradient-to-r from-calm-500/90 from-40% via-calm-400/70 to-60% to-calm-500/90 
  bg-[length:200%_100%] bg-clip-text animate-[text-shimmer_5s_infinite]
        "
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.3, type: "spring", mass: 0.8, stiffness: 250, damping: 10 }}

      >
        Insane light effect with motion and animations.
      </motion.p>

      <motion.p
        className="text-calm-500/90 text-center max-w-xl"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.3, type: "spring", mass: 0.8, stiffness: 250, damping: 10 }}

      >
        Insane boring ass text animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Insane boring ass text animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </motion.p>
    </div >
  );
}

export default LightEffectPage;