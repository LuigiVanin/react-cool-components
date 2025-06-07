'use client'
import { MultiValueInput, Value } from "@/components/gallery/multi-value-input";
import { useState } from "react";

const MultiValueInputPage = () => {
  const [value, setValue] = useState<Value[]>([]);

  const handleChange = (e: Value[]) => {
    // For demonstration, add a new value to the array on each change
    // In a real app, you'd want to parse and update the array more robustly
    console.log(e);
    setValue(e);
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      {JSON.stringify(value)}
      <div className="w-[500px]">
        <MultiValueInput value={value} onChange={handleChange} />
      </div>
    </div>
  )
}

export default MultiValueInputPage;