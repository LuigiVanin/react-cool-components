import { X } from "lucide-react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

export type Tag = {
  value: string;
  label?: string;
  metadata?: unknown;
}

export type TagProps = {
  tag: Tag;
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

const INPUT_WIDTH_BUFFER = 3;


export const EditableTag = ({ tag, onClose, onSave, minWidth, maxWidth }: TagProps) => {
  const reflectionPlaceholderElement = useRef<HTMLParagraphElement>(null)

  const [isEditing, setIsEditing] = useState(false);
  const [inputWidth, setInputWidth] = useState(reflectionPlaceholderElement.current?.clientWidth || minWidth || 0);
  const [valueReflection, setValueReflection] = useState(() => tag.value)

  useEffect(() => {
    setIsEditing(false)
    setValueReflection(tag.value)
  }, [tag.value])

  const updateReflectionWidth = () => {
    if (reflectionPlaceholderElement.current) {
      setTimeout(() => {
        setInputWidth(
          reflectionPlaceholderElement.current?.clientWidth
          || minWidth
          || 0
        )
      })
    }
  }

  const onEdit = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    e.preventDefault();
    updateReflectionWidth();
    setIsEditing(true)
  }

  const handleOnBlur = () => {
    setIsEditing(false)
    setValueReflection(tag.value)
    onSave?.(valueReflection)
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueReflection(e.target.value)
    updateReflectionWidth();
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