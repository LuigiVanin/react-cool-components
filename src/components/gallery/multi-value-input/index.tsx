"use client"
import { motion } from "motion/react"
import React, { PropsWithChildren, useMemo, forwardRef } from "react"

export type Value<T = unknown> = {
  value: string;
  label?: string;
  metadata?: T
}

type Props<T> = PropsWithChildren<{
  value: Value<T>[];
  onChange: (value: Value<T>[]) => void;
}>;

export const MultiValueInput = forwardRef(function MultiValueInput<T>(
  { onChange, value }: Props<T>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
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
      <motion.div className="flex flex-row flex-wrap gap-2 border border-calm-300/80 rounded-md py-2 px-3 shadow-sm bg-calm-50 dark:bg-calm-200/40  focus-within:!shadow-purple-200 focus-within:dark:!shadow-purple-200/40 focus-within:shadow-md focus-within:!border-purple-300 focus-within:dark:!border-purple-300/40  transition-all duration-100 hover:shadow-purple-200 hover:dark:shadow-purple-200/40 hover:border-purple-200 dark:hover:border-purple-200/40 "

      >
        {selectedValues.map((value, index) => (
          <div key={index} className="bg-green-100 rounded-md px-2 py-1">
            {value.value}
          </div>
        ))}
        <input
          ref={ref}
          type="text"
          className="outline-none flex-1"
          value={value[value.length - 1]?.value || ''}
          onChange={handleChangeEvent}
          onKeyDown={handleKeyDown}
        />
      </motion.div>

    </>
  )
})
