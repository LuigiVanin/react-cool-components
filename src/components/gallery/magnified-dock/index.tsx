"use client"
import { cn } from "@/lib/cn"
import { motion, type Variants } from "motion/react"
import { useCallback, useState } from "react"
import type { MagnifiedDockItemVariant, MagnifiedDockSizeVariants } from "./types"
import { containerSizeVariant, slotSizeVariant } from "./variants"

type MagnifiedDockProps<T = unknown> = {
  items: T[]
  size?: MagnifiedDockSizeVariants
  children?: (item: T) => React.ReactNode
}

const MagnifiedDock = function <T>({
  items,
  children,
  size = "md"
}: MagnifiedDockProps<T>) {

  const [indexHovered, setIndexHovered] = useState(-Infinity)

  const defaultTransition = { duration: 0.3, type: "spring", stiffness: 150, mass: 0.75 }

  const itemVariants: Variants = {
    "inactive": {
      scale: 1,
      y: 0,
      opacity: 0.9,
      transition: defaultTransition
    },
    "active": {
      scale: 1.6,
      opacity: 1,
      y: -20,
      transition: defaultTransition

    },
    "semi-active": {
      opacity: 0.98,
      scale: 1.25,
      y: -8,
      transition: {
        duration: 0.25,
        type: "spring",
        stiffness: 250,
        mass: 0.5,
        delay: 0.02,
      }
    }
  }

  const itemWrapperVariants: Variants = {
    "inactive": {
      width: slotSizeVariant[size].inactive.width,
    },
    "active": {
      width: slotSizeVariant[size].active.width,
    },
    "semi-active": {
      width: slotSizeVariant[size]["semi-active"].width,
    }
  }

  const callback = useCallback((index: number): MagnifiedDockItemVariant => {
    const diff = Math.abs(index - indexHovered)
    if (diff === 0) return 'active'
    if (diff === 1) return 'semi-active'
    return 'inactive'
  }, [indexHovered])

  return (
    <div
      className={cn("flex flex-row items-center rounded-2xl dark:bg-calm-200/60 bg-calm-100/60  backdrop-blur-xl border border-calm-300/80 shadow-sm shadow-calm-300/50", containerSizeVariant[size].class)}
      onMouseLeave={() => setIndexHovered(-Infinity)}
    >
      {
        items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemWrapperVariants}
            animate={callback(index)}
            className={cn("slot h-full relative flex items-center justify-center", slotSizeVariant[size].class)}
            onMouseEnter={() => setIndexHovered(index)}
            transition={{ duration: 0.2, type: "spring", stiffness: 350, bounce: 0.3, mass: 0.5 }}
          >
            <motion.div
              variants={itemVariants}
              animate={callback(index)}
              className="relative h-full aspect-square flex items-center justify-center"
            >
              <div className="content absolute inset-0 flex items-center justify-center">
                {children?.(item)}
              </div>
            </motion.div>
          </motion.div>
        ))
      }
    </div>
  )
}

export {
  MagnifiedDock
}