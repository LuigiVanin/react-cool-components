"use client";

import { forwardRef, PropsWithChildren, RefObject, useImperativeHandle, useRef } from "react";
import { useMouse } from "react-use";
import { motion } from "motion/react";
import { ClassValue } from "clsx";
import { cn } from "@/lib/cn";

// reference: https://codesandbox.io/p/sandbox/framer-motion-mouse-position-2b4sd?file=%2Fsrc%2FApp.js%3A90%2C1-91%2C1

type GalleryCardProps = {
  wrapperClassName?: ClassValue
  className?: ClassValue
} & PropsWithChildren

type GalleryCardHeaderProps = {
  className?: ClassValue;
} & PropsWithChildren;

type GalleryCardBodyProps = {
  className?: ClassValue;
} & PropsWithChildren;


const GalleryCard: React.FC<GalleryCardProps> = forwardRef(({ children, wrapperClassName, className }, ref) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => cardRef.current);

  const { docX, docY, posX, posY, elW, elH } = useMouse(cardRef as RefObject<HTMLDivElement>);

  return (
    <div ref={cardRef} className={cn("group/card hover:scale-[1.02] transition-transform duration-300   rounded-2xl  relative overflow-hidden shadow-card p-[1.5px]", wrapperClassName)}>

      <motion.div
        className="h-96 w-96 absolute opacity-80 blur-xl z-0
        bg-[linear-gradient(135deg,_rgb(59,196,242),_rgb(122,105,249),_rgb(242,99,120),_rgb(245,131,63))] [mask-image:radial-gradient(190px,_white,_transparent)] group-hover/card:scale-200 transition-transform duration-200
        "
        style={{
          left: docX - (elW / 2) - posX,
          top: docY - (elH / 2) - posY,
        }}
      />


      <div className={cn("z-10 h-full w-full bg-background/85 p-4 relative rounded-2xl dark:bg-calm-200/80 [backdrop-filter:_blur(50px)]", className)}>
        {children}
      </div>

    </div>
  )
});

const GalleryCardHeader = forwardRef<HTMLDivElement, GalleryCardHeaderProps>(({ children, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("w-full py-7 flex items-center justify-center bg-calm-300/20 rounded-2xl text-foreground", className)}
    >
      {children}
    </div>
  )
});

const GalleryCardBody = forwardRef<HTMLDivElement, GalleryCardBodyProps>(({ children, className }, ref) => {

  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 flex-1 py-3 text-foreground", className)}
    >
      {children}
    </div>
  )
});

GalleryCard.displayName = "GalleryCard";
GalleryCardHeader.displayName = "GalleryCardHeader";
GalleryCardBody.displayName = "GalleryCardBody";

// Attach Header and Body as static properties

export { GalleryCard, GalleryCardHeader, GalleryCardBody };

