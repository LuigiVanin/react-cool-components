"use client"
import { motion, type Variants } from "motion/react"
import { useCallback, useState } from "react"

type MagnifiedDockItemVariant = 'inactive' | 'semi-active' | 'active'

type CallbackFunction = (index: number) => MagnifiedDockItemVariant


type MagnifiedDockProps<T = unknown> = {
  items: T[]
  children?: (item: T) => React.ReactNode
}

const MagnifiedDock = function <T>({ items, children }: MagnifiedDockProps<T>) {
  // <Coffee className="w-10 h-10 text-calm-100" />,

  const [indexHovered, setIndexHovered] = useState(-Infinity)

  const itemWrapperVariants: Variants = {
    "inactive": {
      width: "80px",
    },
    "active": {
      width: "100px",
    },
    "semi-active": {
      width: "87px",
    }
  }

  const defaultTransition = { duration: 0.3, type: "spring", stiffness: 150, mass: 0.75 }

  const itemVariants: Variants = {
    "inactive": {
      scale: 1,
      y: 0,
      opacity: 0.9,
      transition: defaultTransition
    },
    "active": {
      scale: 1.5,
      opacity: 1,
      y: -16,
      transition: defaultTransition

    },
    "semi-active": {
      opacity: 0.98,
      scale: 1.2,
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



  const callback = useCallback<CallbackFunction>((index: number) => {
    const diff = Math.abs(index - indexHovered)
    if (diff === 0) return 'active'
    if (diff === 1) return 'semi-active'
    return 'inactive'
  }, [indexHovered])

  return (
    <div
      className="flex flex-row h-20 items-center rounded-2xl bg-calm-200/60 backdrop-blur-xl border border-calm-300/80 shadow-sm shadow-calm-300/50 px-2"
      onMouseLeave={() => setIndexHovered(-Infinity)}
    >
      {
        items.map((item, index) => (
          <motion.div
            key={index}
            variants={itemWrapperVariants}
            animate={callback(index)}
            className="slot h-full relative flex items-center justify-center py-2.5 px-2 "
            onMouseEnter={() => setIndexHovered(index)}
            transition={{ duration: 0.2, type: "spring", stiffness: 350, bounce: 0.3, mass: 0.5 }}
          >
            <motion.div
              variants={itemVariants}
              animate={callback(index)}
              className="relative rounded-full h-full aspect-square flex items-center justify-center"
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