"use client"
import { Checkbox } from "@/components/gallery/checkbox";
import { useState } from "react"


export default function DialogBottomPage() {
  const [checked, setChecked] = useState(false);


  return (
    <div className="flex w-96 h-full items-center justify-center flex-col gap-2">
      <Checkbox
        size="md"
        checked={checked}
        onChange={(event) => setChecked(event.target.checked)}
        text="lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
      />
    </div>
  )
}
