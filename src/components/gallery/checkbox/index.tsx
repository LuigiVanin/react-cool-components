import { cn } from "@/lib/cn";
import { AnimatePresence, motion, Variants } from "motion/react";
import { ChangeEvent, InputHTMLAttributes, PropsWithChildren } from "react";

type Size = "sm" | "md" | "lg";

type CheckboxProps = PropsWithChildren<{
  name?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  wrapperClassName?: string;
  text?: string;
  size?: Size;
}> & Omit<InputHTMLAttributes<HTMLInputElement>, "checked" | "onChange" | "size">

export const Checkbox = ({
  children,
  text,
  checked,
  onChange,
  name,
  className,
  wrapperClassName,
  size = "md",
  ...attr
}: CheckboxProps) => {

  const sizeClasses = {
    sm: {
      wrapper: "gap-2",
      checkbox: "min-w-4 min-h-4 max-w-4 max-h-4",
      icon: "w-3 h-3",
      text: "text-sm"
    },
    md: {
      wrapper: "gap-3",
      checkbox: "min-w-5 min-h-5 max-w-5 max-h-5",
      icon: "w-4 h-4",
      text: "text-base"
    },
    lg: {
      wrapper: "gap-4",
      checkbox: "min-w-6 min-h-6 max-w-6 max-h-6 rounded-md",
      icon: "w-5 h-5",
      text: "text-lg"
    }
  }
  const checkVariant: Variants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1 }
  }

  return (
    <label htmlFor={`checkbox-${name}`} className={cn("flex flex-row items-start", sizeClasses[size].wrapper, wrapperClassName)} >
      <motion.div
        className={cn(
          "size relative cursor-pointer border border-calm-400 hover:border-calm-500 rounded-sm mt-0.5 shadow-card-2 transition-all duration-200 flex-center text-calm-100",
          sizeClasses[size].checkbox,
          checked ? "bg-brand-500" : "animate-unchecked",
          className
        )}
      >
        <input
          {...attr}
          checked={checked}
          onChange={onChange}
          type="checkbox"
          name={`checkbox-${name}`}
          id={`checkbox-${name}`}
          className="absolute inset-0 bg-black cursor-pointer hidden"
        />
        <AnimatePresence>
          {checked &&
            <motion.svg
              xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"
            >
              <motion.path d="M20 6 9 17l-5-5" initial="hidden" animate="visible" variants={checkVariant} strokeDasharray="1 0" transition={{ duration: 0.3, }} />
            </motion.svg>}

        </AnimatePresence>

        <AnimatePresence>
          {!checked &&
            <motion.svg
              xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x-icon lucide-x"
            >
              <motion.path d="M18 6 6 18" initial="hidden" animate="visible" variants={checkVariant} strokeDasharray="1 0" transition={{ duration: 0.3, }} />
              <motion.path d="m6 6 12 12" initial="hidden" animate="visible" variants={checkVariant} strokeDasharray="1 0" transition={{ duration: 0.3, delay: 0.15 }} />
            </motion.svg>
          }
        </AnimatePresence>
      </motion.div>
      {!children
        ? <p className={cn(
          "text-transparent mb-4 position-relative max-w-xl bg-gradient-to-r from-calm-500 from-40% via-calm-400/80 to-60% to-calm-500 bg-[length:200%_100%] bg-clip-text",
          sizeClasses[size].text,
          checked && 'animate-[text-shimmer_5s_infinite]'
        )}>
          {text}
        </p>
        : children}
    </label>
  )
}