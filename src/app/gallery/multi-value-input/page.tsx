'use client'
import { MultiValueInput, Value } from "@/components/gallery/multi-value-input";
import { EditableTag } from "@/components/gallery/multi-value-input/tag";
import { ArrowBigRightDash, User, X } from "lucide-react";
import { useMemo, useState } from "react";

type Color = "red" | "green" | "purple" | "gray"

const MultiValueInputPage = () => {
  const [value, setValue] = useState<Value<{ color: Color }>[]>([]);

  const handleChange = (e: Value<{ color: Color }>[]) => {
    setValue(e);
  };

  const error = useMemo(() => value.length > 1, [value]);


  return (
    <div className="flex flex-col items-center justify-center h-screen w-full max-w-[500px] px-5">
      <div className="w-full flex flex-col gap-5">
        <MultiValueInput
          placeholder="Escreva aqui..."
          label="Tags"
          error={error}
          errorMessage="This error will be shown, you cant do anything."
          value={value}
          onChange={handleChange}
        />

        <MultiValueInput
          placeholder="Escreva aqui..."
          label="Tags"
          value={value}
          onChange={handleChange}
        />

        <MultiValueInput
          placeholder="Escreva aqui..."
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
          placeholder="Escreva aqui..."
          label="Tags"
          value={value}
          maxLength={200}
          onChange={handleChange}
          suffix={
            <button className="flex flex-row items-center gap-1 h-7 bg-brand-500 px-1 border border-brand-500 text-neutral-50  rounded-sm cursor-pointer hover:opacity-80 transition-all duration-100 mt-auto">
              <ArrowBigRightDash size={19} className="mt-0.5" />
            </button>
          }
        >
          {(value, _, deleteTag) => (
            <EditableTag tag={value} onClose={deleteTag} />
          )}
        </MultiValueInput>


      </div >
    </div >
  )
}

export default MultiValueInputPage;