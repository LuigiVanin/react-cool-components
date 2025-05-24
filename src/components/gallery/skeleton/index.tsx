import React, { PropsWithChildren, useMemo } from "react";
import { cn } from "@/lib/cn";

const animationStyle = {
  pulse: 'animate-pulse',
  none: '',
  wave: 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-calm-300/45 before:to-transparent before:animate-[wave_1.5s_infinite]',
} as const satisfies Readonly<Record<string, string>>;


type SkeletonProps = PropsWithChildren<{
  className?: string;
  animationType?: keyof typeof animationStyle;
}>

type SkeletonGroupProps = Omit<SkeletonProps, 'children'> & { lines: number, lineClassName?: string }


const Skeleton: React.FC<SkeletonProps> = ({ children, className, animationType = 'pulse' }) => {
  return (
    <div
      suppressHydrationWarning
      className={cn(
        "bg-calm-200/85 rounded-md relative overflow-hidden",
        children && 'p-4 bg-calm-200/50 flex flex-col gap-4',
        animationStyle[animationType],
        className,
      )}
    >
      {children}
    </div>
  );
};

const SkeletonGroup: React.FC<SkeletonGroupProps> = ({ className, animationType = 'wave', lines, lineClassName }) => {
  const linesIter = useMemo(() => [...Array(lines).keys()], [lines]);
  const lineWidth = useMemo(() => Math.floor(((Math.random() * 0.7) + 0.25) * 100), []);

  const lineWidthStyle = useMemo(() => ({
    ["--last-line-width" as keyof React.CSSProperties]: `${lineWidth}%`
  }), [lineWidth]);

  return (
    <div
      suppressHydrationWarning
      className={cn("flex flex-col w-full gap-2", className)}
      style={lineWidthStyle}
    >
      {linesIter.map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "h-6 w-full",
            lineClassName,
            index === (lines - 1) && 'w-[var(--last-line-width)]'
          )}
          animationType={animationType}
        />
      ))}
    </div>
  )
}

export { SkeletonGroup, Skeleton };

export default Skeleton;