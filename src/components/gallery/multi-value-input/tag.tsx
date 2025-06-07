export type Tag = {
  value: string;
  label?: string;
  metadata?: unknown;
}

export type TagProps = {
  tag: Tag;
}

export const DefaultTag = ({ tag }: TagProps) => {
  return (
    <div className="bg-green-500 rounded-sm px-2 text-neutral-100">
      {tag.label || tag.value}
    </div>
  )
}