"use client"
import { motion } from "motion/react"
import React, { PropsWithChildren, useMemo, forwardRef, useImperativeHandle, useRef, InputHTMLAttributes } from "react"
import { DefaultTag } from "./tag";

export type Value<T = unknown> = {
  value: string;
  label?: string;
  metadata?: T
}

type MultiValueInputProps<T> = PropsWithChildren<{
  name?: string;
  label?: string | React.ReactNode;
  type?: string;
  value: Value<T>[];
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange: (value: Value<T>[]) => void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>>;

const MultiValueInputWithRef = <T,>(
  { onChange, value, name, label, prefix, suffix, ...attr }: MultiValueInputProps<T>,
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


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onChange?.([...value, { value: '' }]);
    }

  }

  const selectedValues = useMemo(() => {
    return value.slice(0, -1)
  }, [value])

  return (
    <>
      {label && (
        <label
          htmlFor={name ?? 'multi-value-input'}
          className="text-calm-700 block mb-1 ml-0.5"
        >
          {label}
        </label>
      )}
      <motion.div className="flex flex-row gap-2 border border-calm-300 rounded-md py-2 px-3 bg-calm-100/40 dark:bg-calm-200/40  focus-within:dark:border-brand-300/40 transition-all duration-100 focus-within:[box-shadow:0_0px_4px_-1px_var(--color-brand-500)] focus-within:!border-brand-400 hover:border-calm-500"
        onClick={() => inputRef.current?.focus()}
      >
        {prefix && <div className="flex flex-row flex-wrap gap-2 w-full">{prefix}</div>}
        <motion.div className="flex flex-row flex-wrap gap-2 w-full flex-1">
          {selectedValues.map((value, index) => (
            <DefaultTag key={`${value}-${index}`} tag={value} />
          ))}
          <input
            ref={inputRef}
            name={name}
            type={attr.type || 'text'}
            {...attr}
            className={`outline-none flex-1 bg-transparent ${attr.className || ''}`}
            value={value[value.length - 1]?.value || ''}
            onChange={handleChangeEvent}
            onKeyDown={handleKeyDown}
          />
        </motion.div>
        {suffix && <div className="flex flex-row flex-wrap gap-2 w-full">{suffix}</div>}
      </motion.div>

    </>
  )
}

export const MultiValueInput = forwardRef(MultiValueInputWithRef) as <T>(
  props: MultiValueInputProps<T> & { ref?: React.ForwardedRef<HTMLInputElement | null> }
) => React.ReactElement;
