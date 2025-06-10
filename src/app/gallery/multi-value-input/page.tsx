'use client'
import { MultiValueInput, Value } from "@/components/gallery/multi-value-input";
import { Color, ColoredTag, EditableTag } from "@/components/gallery/multi-value-input/tag";
import { ArrowBigRightDash, InfoIcon, User, X } from "lucide-react";
import { useMemo, useState } from "react";

const colors: Color[] = ["red", "green", "purple", "gray", "blue", "yellow"]

const MultiValueInputPage = () => {
  const [value1, setValue1] = useState<Value[]>([]);
  const [value2, setValue2] = useState<Value<{ color: Color }>[]>([]);
  const [value3, setValue3] = useState<Value[]>([]);
  const [value4, setValue4] = useState<Value[]>([]);


  const handleChange1 = (e: Value[]) => {
    setValue1(e);
  };

  const handleChange2 = (e: Value<{ color: Color }>[]) => {
    const temp = [...e];
    const randomIndex = Math.floor(Math.random() * colors.length)
    temp[temp.length - 1].metadata = { color: colors[randomIndex] }
    setValue2(temp);
  };

  const handleChange3 = (e: Value[]) => {
    setValue3(e);
  };

  const handleChange4 = (e: Value[]) => {
    setValue4(e);
  };

  const handleSave = (value: string, index: number) => {
    console.log(value, index);

    if (value4.some(v => v.value === value)) return;

    const temp = [...value4];
    temp[index].value = value;
    setValue4(temp);
  };

  const error = useMemo(() => value1.length > 1, [value1]);


  return (
    <div className="flex flex-col items-center justify-center h-screen w-full max-w-[500px] px-5">
      <div className="w-full flex flex-col gap-5">
        <MultiValueInput
          placeholder="Escreva aqui..."
          label="Basic Usage with Error:"
          error={error}
          errorMessage="This error will be shown, you cant do anything."
          value={value1}
          onChange={handleChange1}
        />

        <MultiValueInput
          placeholder="Escreva aqui..."
          label="With Custom Colored Tags:"
          value={value2}
          onChange={handleChange2}
        >

          {(value, index, deleteTag) => (
            <ColoredTag tag={value} onClose={deleteTag} />
          )}
        </MultiValueInput>

        <MultiValueInput
          placeholder="Escreva aqui..."
          label="With Prefix and Custom Tag:"
          value={value3}
          maxLength={50}
          onChange={handleChange3}
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
          label={
            <label className="text-calm-600 mb-1 ml-0.5 inline-flex items-center gap-1">
              With Suffix and <strong className="font-bold">Editable Tag</strong>
              <InfoIcon size={15} className="text-calm-600" />:
            </label>
          }
          value={value4}
          maxLength={200}
          onChange={handleChange4}
          suffix={
            <button className="flex flex-row items-center gap-1 h-7 bg-brand-500 px-1 border border-brand-500 text-neutral-50  rounded-sm cursor-pointer hover:opacity-80 transition-all duration-100 mt-auto">
              <ArrowBigRightDash size={19} className="mt-0.5" />
            </button>
          }
        >
          {(value, index, deleteTag) => (
            <EditableTag tag={value} onClose={deleteTag} onSave={(e) => handleSave(e, index)} />
          )}
        </MultiValueInput>


      </div >
    </div >
  )
}

export default MultiValueInputPage;