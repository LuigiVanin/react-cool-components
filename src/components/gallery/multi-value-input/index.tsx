"use client"
import { AnimatePresence, motion } from "motion/react"
import { useMemo, forwardRef, useImperativeHandle, useRef, InputHTMLAttributes, ReactNode } from "react"
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
  children?: (value: Value<T>, index: number, deleteTag?: (() => void)) => ReactNode;
  onChange: (value: Value<T>[]) => void;
}

type MultiValueInputProps<T> = MultiValueInputCustomProps<T> &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof MultiValueInputCustomProps<T>>;

const MultiValueInputWithRef = <T,>(
  { onChange, value, name, label, prefix, suffix, children, maxLength, className, wrapperClassName, ...attr }: MultiValueInputProps<T>,
  ref: React.ForwardedRef<HTMLInputElement | null>
) => {
  const inputRef = useRef<HTMLInputElement>(null);
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

    if (e.key === 'Enter' && !isDuplicateInputValue) {
      onChange?.([...value, { value: '' }]);
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
          htmlFor={name ?? 'multi-value-input'}
          className="text-calm-600 block mb-1 ml-0.5"
        >
          {label}
        </label>
      )}
      <motion.div className={cn("group/input flex flex-row gap-2 border border-calm-300/90 rounded-sm py-2 px-2.5 bg-calm-100/40 dark:bg-calm-200/40  focus-within:dark:border-brand-300/40 transition-all duration-100 focus-within:!border-brand-400 hover:border-calm-400 [box-shadow:0_0px_5px_-3px_var(--color-calm-400)] focus-within:[box-shadow:0_0px_5px_-1px_var(--color-brand-500)]", className)}
        onClick={() => inputRef.current?.focus()}
      >
        {prefix && (
          <div className="flex flex-row group-focus-within/input:text-brand-400 text-calm-500">
            {typeof prefix === 'function' ? prefix() : prefix}
          </div>
        )}

        <motion.div className="flex flex-row flex-wrap gap-2 w-full flex-1">
          <AnimatePresence mode="popLayout">          {
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
              // selectedValues.map((value, index) => {
              //   const child = children(value, index, () => deleteTag(index))
              //   if (isValidElement(child)) {
              //     return cloneElement(child, { key: `${value.value}-${index}` })
              //   }
              //   return child;
              // })
            }
          </AnimatePresence>

          <input
            {...attr}

            ref={inputRef}
            name={name}
            type={attr.type || 'text'}
            className={`outline-none flex-1 bg-transparent`}
            value={value[value.length - 1]?.value || ''}
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
    </motion.div>
  )
}

export const MultiValueInput = forwardRef(MultiValueInputWithRef) as <T>(
  props: MultiValueInputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement | null> }
) => React.ReactElement;
