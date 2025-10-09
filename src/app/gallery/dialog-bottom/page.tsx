"use client";
import { DialogBottom } from "@/components/gallery/dialog-bottom";
import { Maximize2, Rocket } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function DialogBottomPage() {
  const [show, setShow] = useState(false);

  const actions = {
    primary: {
      content: (
        <div className="flex items-center">
          <Rocket className="mr-2" size={18} />
          <span>Submit</span>
        </div>
      ),
      onClick: () => setShow(false),
    },
    secondary: {
      content: "Close",
      onClick: () => setShow(false),
    },
  };





  return (
    <main className="w-full min-h-full flex gap-5 items-center justify-center p-5">
      <DialogBottom
        actions={actions}
        show={show}
        setShow={(value) => setShow(value)}
        trigger={
          <motion.button
            className="bg-brand-500 dark:bg-brand-400 w-80 shadow-sm cursor-pointer text-white px-3 py-2 rounded-md flex flex-row items-center justify-center gap-3 transition-opacity duration-150 opacity-100 hover:opacity-80 "
            onClick={() => setShow(true)}
          >
            <Maximize2 size={18} />
            <span>Open Here</span>
          </motion.button>
        }
      >
        <h1 className="text-xl text-calm-600 font-bold">
          Enable Location Services
        </h1>

        <p className=" text-calm-500/90 text-center mb-4">
          Please enable location services to find nearby stores and offers.
        </p>
      </DialogBottom>
    </main>
  );
}
