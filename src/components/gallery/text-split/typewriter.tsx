import { type AnimationDefinition, motion } from "motion/react"
import { defaultAnimate, defaultInitial, DELAY, TextSplit, type TextSplitProps } from "."
import { forwardRef, type ReactNode, useState } from "react"
import { cn } from "@/lib/cn"
import type { Animate, Initial } from "@/types"

export type TypeWriterProps = Omit<TextSplitProps, 'children'> & {
  children?: (currentChunkPostion: DOMRect | null) => ReactNode
};

export const TypeWriter = forwardRef<HTMLParagraphElement, TypeWriterProps>((
  {
    breakpoint = '',
    interval = DELAY,
    initial = defaultInitial as Initial,
    animate = defaultAnimate as Animate,
    onAnimationEnd,
    onAnimationStart,
    children,
    ...props
  },
  ref
) => {
  const [currentChunkPosition, setCurrentChunkPosition] = useState<DOMRect | null>(null)

  const handleAnimationStart = (_: AnimationDefinition, el: HTMLSpanElement | null, index: number) => {
    onAnimationStart?.(_, el, index)
    if (el) {
      if (!index) {
        setCurrentChunkPosition(el?.getBoundingClientRect())
      }
      setTimeout(() => setCurrentChunkPosition(el?.getBoundingClientRect()), index * (interval * 1000))
    }
  }

  return (
    <TextSplit
      ref={ref}
      breakpoint={breakpoint}
      initial={initial}
      animate={animate}
      onAnimationStart={handleAnimationStart}
      onAnimationEnd={onAnimationEnd}
      {...props}
    >
      {children ?
        children(currentChunkPosition) :
        <motion.span
          className={cn("w-2 animate-blink bg-foreground absolute content-none", currentChunkPosition && 'opacity-0')}
          animate={{
            left: currentChunkPosition?.right || 0,
            top: currentChunkPosition?.top || 0,
            height: currentChunkPosition?.height,
            transition: { duration: 0.15 },
          }}
        />
      }
    </TextSplit>
  )
})

TypeWriter.displayName = 'TypeWriter';
