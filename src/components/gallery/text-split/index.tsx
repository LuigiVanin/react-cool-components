'use client'
import { cn } from "@/lib/cn";
import type { Animate, Initial } from "@/types";
import { AnimationDefinition, motion, Transition } from "motion/react";
import { forwardRef, PropsWithChildren, useMemo, useRef } from "react";

export type TextSplitProps = PropsWithChildren<{
  text: string;
  breakpoint?: string | number;
  className?: string;
  interval?: number;
  transition?: Transition;
  initial?: Initial;
  animate?: Animate;
  onAnimationEnd?: (def: AnimationDefinition, el: HTMLSpanElement | null, index: number) => void;
  onAnimationStart?: (def: AnimationDefinition, el: HTMLSpanElement | null, index: number) => void;
}>

export const defaultInitial: Readonly<Initial> = {
  opacity: 0,
}

export const defaultAnimate: Readonly<Animate> = {
  opacity: 1,
}

export const DELAY: Readonly<number> = 0.15;


export const TextSplit = forwardRef<HTMLParagraphElement, TextSplitProps>((
  {
    text,
    breakpoint = '',
    interval = DELAY,
    initial = defaultInitial,
    animate = defaultAnimate,
    className,
    transition,
    children,
    onAnimationEnd,
    onAnimationStart,
  },
  ref
) => {
  const chunkRefs = useRef<(HTMLSpanElement | null)[]>([])

  const textChunks = useMemo(() => {
    if (typeof breakpoint === 'string')
      return text.split(breakpoint);
    else {
      const chunks = []
      const textChunk = text.split('')

      for (let i = 0; i < textChunk.length; i += breakpoint) {
        const maxIndex = Math.min(i, textChunk.length - 1)
        chunks.push(text.slice(maxIndex, maxIndex + breakpoint));
      }
      return chunks
    }
  }, [text, breakpoint]);

  return (
    <motion.p ref={ref} className={cn("whitespace-pre [text-wrap-mode:wrap]", className)} >
      {
        textChunks.map((chunk, index) => {
          return (
            <motion.span
              ref={(el) => { chunkRefs.current[index] = el }}
              className={cn()}
              key={`${chunk}-${index}`}
              initial={initial}
              animate={animate}
              transition={{ duration: 0.25, delay: index * interval, ...transition }}
              onAnimationComplete={(def) => {
                onAnimationEnd?.(def, chunkRefs.current[index], index)
              }}
              onAnimationStart={(def) => {
                onAnimationStart?.(def, chunkRefs.current[index], index)
              }}
            >
              {chunk}{typeof (breakpoint) === 'string' &&
                (index !== (textChunks.length - 1)) &&
                breakpoint}
            </motion.span>
          )
        })
      }
      {children}
    </motion.p>
  )
})

TextSplit.displayName = 'TextSplit'

export * from "./typewriter"