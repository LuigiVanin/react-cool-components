"use client";

import { useEffect, useRef } from "react";
import { useMouse } from "react-use"

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
  const { docX, docY, elW, elH } = useMouse(cardRef);

  useEffect(() => {
    console.log(cardRef)
  }, [])

  return (
    <div ref={cardRef} className="">
      <div className="h-96 w-96 absolute blur-3xl" style={{
        background: "linear-gradient(135deg, rgb(59, 196, 242), rgb(122, 105, 249), rgb(242, 99, 120), rgb(245, 131, 63))",
        maskImage: "radial-gradient(190px, white, transparent)",
        left: docX - 192,
        top: docY - 192,
      }} />
      <span>{docX}</span>
      /
      <span>{docY}</span>
      / {elW}
    </div>
  )
}

export default GalleryCard;