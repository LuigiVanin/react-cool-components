"use client";

import { useEffect, useRef } from "react";
import { useMouse } from "react-use"
// import {motion} from "motion/react"

// reference: https://codesandbox.io/p/sandbox/framer-motion-mouse-position-2b4sd?file=%2Fsrc%2FApp.js%3A90%2C1-91%2C1

type GalleryCardProps = {

}

// mask-image: radial-gradient(200px, white, transparent);
// width: 400px;
// height: 400px;
//  background: linear-gradient(135deg, rgb(59, 196, 242), rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63));
// left: 279.8px;
// top: 268.3px;


const GalleryCard = (props: GalleryCardProps) => {
  const cardRef = useRef(null as any);
  const { docX, docY, elW, elH, posX, posY } = useMouse(cardRef);

  useEffect(() => {
    console.log(cardRef)
  }, [])

  return (
    <div ref={cardRef} className="group/card hover:scale-[1.01] transition-transform duration-200 w-96 h-72  rounded-2xl  relative overflow-hidden shadow-card p-[1px] ">

      <div
        className="z-0 h-80 w-80 absolute transition-transform duration-500 group-hover/card:scale-[1.65] opacity-80 bg-[linear-gradient(135deg,_rgb(59,196,242),_rgb(122,105,249),_rgb(242,99,120),_rgb(245,131,63))] [mask-image:radial-gradient(190px,_white,_transparent)]"
        style={{
          left: docX - 192 - posX,
          top: docY - 192 - posY,
        }} />

      <div className="z-10 h-full w-full bg-background/60 p-4 relative rounded-2xl dark:bg-calm-200/60 [backdrop-filter:blur(150px)]">

        <div className="w-20 h-20 bg-background/40"></div>
        <span>{docX - 192 - posX}</span>
        <br />
        <span>{docY - 192 - posY}</span>
      </div>

    </div>
  )
}

export default GalleryCard;