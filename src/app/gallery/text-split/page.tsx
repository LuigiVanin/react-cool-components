"use client"
import { TextSplit, TypeWriter } from "@/components/gallery/text-split";

const TextSplitPage = () => {


  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <main className="max-w-[380px] flex flex-col items-center justify-center gap-2">
        <TextSplit
          text="Hello, world!"
          className="text-2xl font-bold text-center inline-flex flex-wrap justify-center"
          transition={{ type: "spring", mass: 0.8, stiffness: 250, damping: 10 }}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          interval={0.1}
        />

        <TextSplit
          text="Insane boring ass text animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          className="text-center inline-flex flex-wrap text-calm-600/90 justify-center mb-5"
          breakpoint={10}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        />

        <TypeWriter
          text="Insane boring ass text animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Insane boring ass text animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          className="text-calm-600/90 text-center mb-5"
          breakpoint={" "}
        />

        <TypeWriter
          text="Insane boring ass text animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Insane boring ass text animation. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          className="text-calm-600/90 text-center"
          breakpoint={" "}
        />


      </main>
    </div>
  )
}

export default TextSplitPage;