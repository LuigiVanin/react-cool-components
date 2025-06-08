'use client'
import { MultiValueInput, Value } from "@/components/gallery/multi-value-input";
import { User, X } from "lucide-react";
import { useState } from "react";

type Color = "red" | "green" | "purple" | "gray"

const MultiValueInputPage = () => {
  const [value, setValue] = useState<Value<{ color: Color }>[]>([]);

  const handleChange = (e: Value<{ color: Color }>[]) => {
    // For demonstration, add a new value to the array on each change
    // In a real app, you'd want to parse and update the array more robustly
    setValue(e);
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen w-full max-w-[500px] px-5">
      <div className="w-full flex flex-col gap-5">
        <MultiValueInput
          label="Tags"
          value={value}
          onChange={handleChange}
        />

        <MultiValueInput
          label="Tags"
          value={value}
          maxLength={50}
          onChange={handleChange}
          prefix={<User size={19} className="mt-0.5" />}
        >
          {(value, index, deleteTag) => (
            <div className="flex flex-row gap-1 min-h-7 items-center bg-danger-100 px-1 border border-danger-400 text-danger-500  rounded-md">
              <User size={15} className="min-w-4 min-h-4" />
              <p className="leading-5">
                {value.label || value.value}
              </p>
              <X size={15} className="cursor-pointer mt-0.5 min-w-4 min-h-4" onClick={deleteTag} />
            </div>
          )}
        </MultiValueInput>

        <MultiValueInput
          label="Tags"
          value={value}
          maxLength={50}
          onChange={handleChange}
          prefix={<User size={19} className="mt-0.5" />}
        >
          {(value, index, deleteTag) => (
            <div className="flex flex-row gap-1 min-h-7 items-center bg-danger-100 px-1 border border-danger-400 text-danger-500  rounded-md">
              <User size={15} className="min-w-4 min-h-4" />
              <p className="leading-5">
                {value.label || value.value}
              </p>
              <X size={15} className="cursor-pointer mt-0.5 min-w-4 min-h-4" onClick={deleteTag} />
            </div>
          )}
        </MultiValueInput>
      </div>
    </div>
  )
}

export default MultiValueInputPage;