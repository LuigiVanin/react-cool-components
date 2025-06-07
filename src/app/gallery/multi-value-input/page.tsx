'use client'
import { MultiValueInput, Value } from "@/components/gallery/multi-value-input";
import { useState } from "react";

type Color = "red" | "green" | "purple" | "gray"

const MultiValueInputPage = () => {
  const [value, setValue] = useState<Value<{ color: Color }>[]>([]);

  const handleChange = (e: Value<{ color: Color }>[]) => {
    // For demonstration, add a new value to the array on each change
    // In a real app, you'd want to parse and update the array more robustly
    console.log(e);
    setValue(e);
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      {JSON.stringify(value)}
      <div className="w-[500px]">
        <MultiValueInput value={value} onChange={handleChange} label="Tags" />
      </div>
    </div>
  )
}

export default MultiValueInputPage;