import React from "react";
import { cn } from "@/lib/cn";

const animationStyle = {
  pulse: 'animate-pulse',
  none: '',
  wave: 'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-calm-300/45 before:to-transparent before:animate-[wave_1.5s_infinite]',
} as const satisfies Readonly<Record<string, string>>;

// Add this to your Tailwind CSS configuration if needed:


interface SkeletonProps {
  className?: string;
  animationType?: keyof typeof animationStyle;
}


const Skeleton: React.FC<SkeletonProps> = ({ className, animationType = 'pulse' }) => {
  return (
    <div
      className={cn(
        "bg-calm-200/80 rounded-md relative overflow-hidden",
        className,
        animationStyle[animationType]
      )}
    />
  );
};

export default Skeleton;