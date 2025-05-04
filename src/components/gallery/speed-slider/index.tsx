"use client"
import { cn } from "@/lib/cn";
import { Volume1, Volume2, Volume, VolumeX } from "lucide-react";
import {
  AnimatePresence,
  motion,
  SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  Variants
} from "motion/react"
import { useRef, useEffect, useState } from "react"
import { useMemo } from "react";

export type SpeedSliderProps = {
  className?: string
}

const SpeedSlider = ({ className }: SpeedSliderProps) => {
  const sliderContainerRef = useRef<HTMLDivElement>(null)

  const [xValue, setXValue] = useState(0)
  const [containerWidth, setContainerWidth] = useState(200)
  const [isHovered, setIsHovered] = useState(false)

  const trackPercentage = useMemo(() => {
    const percentage = Math.min(Math.max(xValue / (containerWidth - 20), 0), 1) * 100;
    return percentage;
  }, [xValue, containerWidth])

  const x = useMotionValue(0)
  const xv = useVelocity(x);
  const scale = useTransform(x, [0, containerWidth], [1, 1.15])
  const trackerWidth = useTransform(() => Math.max(x.get(), 0) + 10)
  const rotate = useTransform(
    xv,
    [-3000, 0, 3000],
    [50, 0, -50],
    { clamp: false }
  )
  const xOffset = useTransform(xv,
    [-3000, 0, 3000],
    [15, 0, -15],
    { clamp: false }
  )

  const springConfig: SpringOptions = {
    stiffness: 350,
    damping: 18,
    mass: 0.8,
  };

  // NOTE: On abruptly changing values, like velocity, the normal transition isnt good to smooth it out the
  // animation, to do it we have to actually smooth the abruptly changing value using *useSpring* hook.
  const smoothRotate = useSpring(rotate, springConfig);
  const smoothXOffset = useSpring(xOffset, springConfig);


  useEffect(() => {
    const element = sliderContainerRef.current;
    if (!element) return;

    setContainerWidth(element.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const newWidth = entries[0].borderBoxSize?.[0]?.inlineSize ??
          entries[0].contentRect.width;
        setContainerWidth(newWidth);
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);


  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      setXValue(latest)
    })
    return () => unsubscribe();
  }, [x])

  const sliderContainerVariants: Variants = {
    initial: {
      height: 8,
    },
    hover: {
      transition: { duration: 0.2, type: "spring", mass: 0.8, stiffness: 200, damping: 8, bounce: 0 },
      height: 38,
    },
  }

  const sliderThumbVariants: Variants = {
    initial: {
      height: 24,
      width: 24,
      borderRadius: "50%",

    },
    hover: {
      width: 18,
      height: 48,
      borderRadius: "6px",

    },
  }

  const volumeIcon = useMemo(() => {
    if (trackPercentage === 0) {
      return <VolumeX size={23} />
    } else if (trackPercentage > 0 && trackPercentage < 15) {
      return <Volume size={23} />
    } else if (trackPercentage >= 15 && trackPercentage < 55) {
      return <Volume1 size={23} />
    } else {
      return <Volume2 size={23} />
    }
  }, [trackPercentage])

  return (
    <motion.div
      variants={sliderContainerVariants}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      ref={sliderContainerRef}
      className={cn("slider w-full max-w-[700px] bg-calm-300 rounded-lg relative flex items-center justify-start", className)}
    >
      <motion.span
        className="slider-tracker h-full rounded-lg bg-calm-700 flex items-center justify-start text-background/50 pl-3 overflow-hidden"
        style={{ width: trackerWidth }}
      >
        <AnimatePresence>
          {isHovered &&
            <motion.span key="icon" exit={{ opacity: 0 }}>
              {volumeIcon}
            </motion.span>
          }
        </AnimatePresence>
      </motion.span>
      <motion.span
        className="slider-thumb absolute left-0 bg-calm-500 rounded-full cursor-grab shadow-md flex-center"
        initial={"initial"}
        animate={isHovered ? "hover" : "initial"}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        variants={sliderThumbVariants}
        drag="x"
        dragElastic={0.025}
        dragMomentum={false}
        dragConstraints={sliderContainerRef}
        whileDrag={{ cursor: "grabbing" }}
        onDragEnd={() => {
          setIsHovered(false)
        }}
        style={{
          x,
          scale,
        }}
      >

        <motion.div
          className="slider-thumb-label absolute w-auto h-auto p-1 px-2 -top-10 rounded-lg bg-indigo-600/80 pointer-events-none text-sm transition-opacity duration-300 text-neutral-100"
          style={{
            transformOrigin: "center 60px 0",
            rotate: smoothRotate,
            x: smoothXOffset,
            opacity: isHovered ? 1 : 0,
          }}
        >
          {trackPercentage.toFixed()}%
        </motion.div>
      </motion.span>
    </motion.div >
  )
}

export {
  SpeedSlider
}
