"use client"
import { motion, useMotionValue, useTransform } from "motion/react"
import { useRef, useEffect, useState } from "react"

export type SpeedSliderProps = {
  className?: string
}

const SpeedSlider = ({ }: SpeedSliderProps) => {
  const sliderContainerRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const [containerWidth, setContainerWidth] = useState(200)
  const scale = useTransform(x, [0, containerWidth], [1, 1.3])
  const background = useTransform(
    x,
    [0, containerWidth],
    [
      "linear-gradient(90deg, #ff0000, #ff7300)",
      "linear-gradient(180deg, #00ff00, #0073ff)"
    ]
  )

  useEffect(() => {
    const element = sliderContainerRef.current;
    if (!element) return; // Exit if ref not attached yet

    // Get initial width immediately
    setContainerWidth(element.offsetWidth);

    // Create an observer
    const observer = new ResizeObserver((entries) => {
      // entries[0] corresponds to the observed element (sliderContainerRef)
      if (entries[0]) {
        // Use contentRect for width excluding padding/border,
        // or borderBoxSize for width including padding/border (more common for offsetWidth equivalent)
        const newWidth = entries[0].borderBoxSize?.[0]?.inlineSize ?? // Modern way
          entries[0].contentRect.width; // Fallback or specific need
        setContainerWidth(newWidth);
      }
    });

    // Start observing the element
    observer.observe(element);

    // Cleanup function: disconnect the observer when component unmounts
    return () => {
      console.log("Disconnecting observer");
      observer.disconnect();
    };
  }, []);

  // DEBUG: Display the current value of x
  const [xValue, setXValue] = useState(0)

  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      setXValue(latest)
    })
    return () => unsubscribe()
  }, [x])
  // END DEBUG

  return (
    <div className="w-full flex-center flex-col">
      <motion.div ref={sliderContainerRef} className="w-full max-w-[700px] h-2 bg-calm-300 rounded-full relative flex-center">
        <motion.span
          className="absolute h-6 w-6 left-0 bg-calm-500 rounded-full cursor-grab"
          initial={{ x: 0 }}
          style={{ x, scale, background }}
          drag="x"
          dragElastic={0.025}
          dragMomentum={false}
          dragConstraints={sliderContainerRef}
          whileDrag={{ cursor: "grabbing" }}
        />
      </motion.div>
      {/* Display the current value of x */}
      <p className="text-center mt-4 text-sm text-foreground">Current X: {xValue.toFixed(2)}</p>
      <p className="text-center mt-4 text-sm text-foreground">Container W: {containerWidth}</p>

    </div>
  )
}

export {
  SpeedSlider
}