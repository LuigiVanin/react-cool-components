import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { MouseEventHandler, useEffect, useLayoutEffect, useRef, useState } from "react";

export type Tag<T = unknown> = {
  value: string;
  label?: string;
  metadata?: T;
}

export type TagProps<T = unknown> = {
  tag: Tag<T>;
  minWidth?: number;
  maxWidth?: number;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onSave?: (value: string) => void;
}


export const DefaultTag = ({ tag, onClose }: TagProps) => {
  return (
    <div className="bg-success-200/50 border border-success-400 rounded-sm px-2 pl-1 text-success-500 flex gap-1 items-center">
      <button className="p-0 cursor-pointer bg-calm-800/5 rounded-xs" onClick={onClose}>
        <X size={14} />
      </button>
      <p className="">
        {tag.label || tag.value}
      </p>
    </div>
  )
}

export type Color = "red" | "green" | "purple" | "gray" | "blue" | "yellow"

export const ColoredTag = ({ tag, onClose }: TagProps<{ color: Color }>) => {
  const colorVariants: Record<Color, string> = {
    gray: "bg-calm-400 border border-gray-400 text-white",
    red: "bg-danger-500 border border-danger-400 text-white",
    green: "bg-success-500 border border-success-400 text-white",
    purple: "bg-brand-400 border border-brand-400 text-white",
    blue: "bg-info-400 border border-info-400 text-white",
    yellow: "bg-warning-500 border border-warning-500 text-white",
  }

  return (
    <div className={cn(
      "bg-success-200/50 border border-success-400 rounded-sm px-2 pl-1 text-success-500 flex gap-1 items-center",
      colorVariants[tag.metadata?.color || "gray"]
    )}>
      <button className="p-0 cursor-pointer bg-calm-800/5 rounded-xs" onClick={onClose}>
        <X size={14} />
      </button>
      <p className="">
        {tag.label || tag.value}
      </p>
    </div>
  )
}

const INPUT_WIDTH_BUFFER = 3;

export const EditableTag = ({ tag, onClose, onSave, minWidth, maxWidth }: TagProps) => {
  const reflectionPlaceholderElement = useRef<HTMLParagraphElement>(null)

  const [isEditing, setIsEditing] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const [valueReflection, setValueReflection] = useState(tag.value)

  useEffect(() => {
    setIsEditing(false)
    setValueReflection(tag.value)
  }, [tag.value])

  useLayoutEffect(() => {
    if (isEditing && reflectionPlaceholderElement.current) {
      setInputWidth(reflectionPlaceholderElement.current.clientWidth);
    }
  }, [isEditing, valueReflection]);

  const onEdit = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsEditing(true)
  }

  const handleOnBlur = () => {
    setIsEditing(false);
    setValueReflection(tag.value);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueReflection(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSave?.(valueReflection)
      setTimeout(() => {
        handleOnBlur()
      }, 100)
    }
  }


  return (
    <div className="bg-success-200/50 border border-success-400 rounded-sm px-2 pl-1 text-success-500 flex gap-1 items-center">
      <button className="p-0 cursor-pointer bg-calm-800/5 rounded-xs" onClick={onClose}>
        <X size={14} />
      </button>
      {
        !isEditing && (
          <p className="" onClick={onEdit}>
            {tag.label || tag.value}
          </p>
        )
      }
      {
        isEditing && (
          <input
            autoFocus
            type="text"
            className="outline-none bg-transparent"
            value={valueReflection}
            onClick={e => e.stopPropagation()}
            onChange={handleOnChange}
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlur}
            style={{
              width: `${inputWidth + INPUT_WIDTH_BUFFER}px`,
              minWidth: `${minWidth}px`,
              maxWidth: `${maxWidth}px`
            }}
          />
        )
      }
      <p
        ref={reflectionPlaceholderElement}
        className="absolute opacity-0 top-0 left-0 invisible pointer-events-none whitespace-pre"
      >
        {valueReflection}
      </p>
    </div>
  )
}