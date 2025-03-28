"use client";

import { useEffect, useRef } from "react";
import { useMouse } from "react-use"
import { motion } from "motion/react"

// reference: https://codesandbox.io/p/sandbox/framer-motion-mouse-position-2b4sd?file=%2Fsrc%2FApp.js%3A90%2C1-91%2C1

type GalleryCardProps = {

}


const GalleryCard = (props: GalleryCardProps) => {

  const cardRef = useRef(null as any);
  const { docX, docY, posX, posY } = useMouse(cardRef);


  return (
    <div ref={cardRef} className="group/card hover:scale-[1.02] transition-transform duration-200 w-96 h-72  rounded-2xl  relative overflow-hidden shadow-card p-[1.5px] ">

      <motion.div
        className="h-96 w-96 absolute group-hover/card:scale-[1.85] transition-transform duration-200 group-hover/opacity-80 opacity-80 blur-2xl z-0
        bg-[linear-gradient(135deg,_rgb(59,196,242),_rgb(122,105,249),_rgb(242,99,120),_rgb(245,131,63))] [mask-image:radial-gradient(190px,_white,_transparent)]
        "
        style={{
          left: docX - (384 / 2) - posX,
          top: docY - (384 / 2) - posY,
        }}

      />


      <div className="z-10 h-full w-full bg-background/80 p-4 relative rounded-2xl dark:bg-calm-200/75 ">

      </div>

    </div>

  )


}

export default GalleryCard;

