import { X } from "lucide-react";
import { MouseEventHandler } from "react";

export type Tag = {
  value: string;
  label?: string;
  metadata?: unknown;
}

export type TagProps = {
  tag: Tag;
  onClose?: MouseEventHandler<HTMLButtonElement>;
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