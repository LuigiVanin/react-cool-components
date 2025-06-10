"use client"
import { AnimatePresence, motion } from "motion/react"
import { useMemo, forwardRef, useImperativeHandle, useRef, InputHTMLAttributes, ReactNode, useState } from "react"
import { DefaultTag } from "./tag";
import { cn } from "@/lib/cn";

export type Value<T = unknown> = {
  value: string;
  label?: string;
  metadata?: T
}

type MultiValueInputCustomProps<T> = {
  name?: string;
  label?: string | ReactNode;
  type?: string;
  value: Value<T>[];
  prefix?: ReactNode | (() => ReactNode);
  suffix?: ReactNode | (() => ReactNode);
  maxLength?: number;
  className?: string;
  wrapperClassName?: string;
  keyBreakpoint?: string;
  error?: boolean;
  errorMessage?: string;
  children?: (value: Value<T>, index: number, deleteTag?: (() => void)) => ReactNode;
  onChange: (value: Value<T>[]) => void;
}

type MotionInputConflictProps = 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'

type MultiValueInputProps<T> = MultiValueInputCustomProps<T> &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof MultiValueInputCustomProps<T> | MotionInputConflictProps>;

const MultiValueInputWithRef = <T,>(
  { onChange, value, name, label, prefix, suffix, children, maxLength, className, wrapperClassName, keyBreakpoint = "Enter", error = false, errorMessage, ...attr }: MultiValueInputProps<T>,
  ref: React.ForwardedRef<HTMLInputElement | null>
) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [backspaceCount, setBackspaceCount] = useState(0);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)


  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;

    if (!value.length) {
      onChange?.([{ value: newValue }]);
      return;
    }

    const temp = [...value];
    const currentIndex = temp.length - 1;

    temp[currentIndex] = { ...temp[currentIndex], value: newValue }
    onChange?.(temp);
  }

  const isDuplicateInputValue = useMemo(() => {
    const currentInputValue = value[value.length - 1];
    return value.length > 0 && value.slice(0, -1).some(v => v.value === currentInputValue.value);
  }, [value]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !currentInput?.value) {
      setBackspaceCount(backspaceCount + 1);

      if (backspaceCount >= 1) {
        onChange?.(value.slice(0, -1));
        setBackspaceCount(0);
        e.preventDefault();
      }
    } else setBackspaceCount(0);

    if (e.key === keyBreakpoint && !isDuplicateInputValue && !!currentInput?.value) {
      const temp = value.map(v => ({ ...v, value: v.value.trim() }))
      onChange?.([...temp, { value: '' }]);
    }
  }

  const selectedValues = useMemo(() => {
    return value.slice(0, -1)
  }, [value])

  const deleteTag = (idx: number) => {
    const temp = [...value]
    temp.splice(idx, 1);
    onChange?.(temp)
  }

  const currentInput = useMemo(() => {
    return value[value.length - 1]
  }, [value])

  const currentTotalLength = useMemo(() => {
    return value.reduce((acc, curr) => acc + curr.value.length, 0)
  }, [value])

  const currentInputMaxLength = useMemo(() => {
    if (maxLength === undefined || maxLength === null) return undefined
    return maxLength - value.slice(0, -1).reduce((acc, curr) => acc + curr.value.length, 0)
  }, [maxLength, value])

  return (
    <motion.div className={cn("flex flex-col gap-0 w-full relative", wrapperClassName)}>
      {label && (
        <label
          htmlFor={attr.id ?? 'multi-value-input'}
          className="text-calm-600 block mb-1 ml-0.5"
        >
          {label}
        </label>
      )}
      <motion.div
        className={cn(
          "group/input flex flex-row gap-2 border border-calm-300/90 rounded-md py-2 px-2.5 bg-calm-100/40 dark:bg-calm-200/40  focus-within:dark:border-brand-300/40 transition-all duration-100 focus-within:!border-brand-400 hover:border-calm-400 [box-shadow:0_0px_3px_-2px_var(--color-calm-400)] focus-within:[box-shadow:0_0px_3px_1px_var(--color-brand-300)] z-20",
          error && "border-danger-400 hover:border-danger-400 focus-within:!border-danger-400 focus-within:[box-shadow:0_0px_3px_1px_var(--color-danger-300)]",
          className
        )}
        onClick={() => inputRef.current?.focus()}
      >
        {prefix && (
          <div className="flex flex-row group-focus-within/input:text-brand-400 text-calm-500">
            {typeof prefix === 'function' ? prefix() : prefix}
          </div>
        )}

        <motion.div className="flex flex-row flex-wrap gap-2 w-full flex-1">
          <AnimatePresence mode="popLayout">
            {
              !children &&
              selectedValues.map((value, index) => (
                <motion.div
                  layout
                  key={`${value.value}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <DefaultTag tag={value} onClose={() => deleteTag(index)} />
                </motion.div>
              ))}
            {
              children &&
              selectedValues.map((value, index) =>
                <motion.div
                  layout
                  key={`${value.value}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {children(value, index, () => deleteTag(index))}
                </motion.div>
              )
            }
          </AnimatePresence>
          <motion.input
            {...attr}
            key='last-element-3721893728319476341'
            ref={inputRef}
            id={attr.id ?? 'multi-value-input'}
            name={name}
            type={attr.type || 'text'}
            className={`outline-none flex-1 bg-transparent min-w-32`}
            value={currentInput?.value || ''}
            onChange={handleChangeEvent}
            onKeyDown={handleKeyDown}
            maxLength={currentInputMaxLength}
          />
        </motion.div>
        {suffix && (
          <div className="flex flex-row group-focus-within/input:text-brand-400 text-calm-500">
            {typeof suffix === 'function' ? suffix() : suffix}
          </div>
        )}
      </motion.div>
      {maxLength &&
        <motion.div className="absolute -bottom-6 right-0 text-calm-500 text-xs bg-calm-200/60 px-1 py-0.5 rounded-sm">
          {currentTotalLength}/{maxLength}
        </motion.div>
      }
      <AnimatePresence mode="wait">
        {errorMessage && error && (
          <motion.p
            key="error-message"
            exit={{ opacity: 0.7, y: -10, height: 0 }}
            initial={{ opacity: 0.7, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            transition={{ duration: 0.1 }}
            className="text-danger-400 text-xs  px-1 py-0.5 rounded-sm mt-0.5 z-10"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export const MultiValueInput = forwardRef(MultiValueInputWithRef) as <T>(
  props: MultiValueInputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement | null> }
) => React.ReactElement;
