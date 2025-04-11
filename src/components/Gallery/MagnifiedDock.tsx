"use client"
import { Coffee } from "lucide-react"
import { useState } from "react"

const MagnifiedDock = () => {
  const items = [
    <Coffee className="w-10 h-10 text-calm-100" />,
    <Coffee className="w-10 h-10 text-calm-100" />,
    <Coffee className="w-10 h-10 text-calm-100" />,
    <Coffee className="w-10 h-10 text-calm-100" />,
    <Coffee className="w-10 h-10 text-calm-100" />,
    <Coffee className="w-10 h-10 text-calm-100" />,
    <Coffee className="w-10 h-10 text-calm-100" />,
  ]

  const [indexHovered, setIndexHovered] = useState(-Infinity)

  return (
    <div className="wrapper">
      {indexHovered}
      <div
        className="flex flex-row h-20 items-center rounded-2xl bg-calm-200/60 backdrop-blur-xl border border-calm-300/80 shadow-sm shadow-calm-300/50"
        onMouseLeave={() => setIndexHovered(-Infinity)}
      >
        {
          items.map((item, index) => (
            <div
              key={index}
              className="slot w-20 h-full relative flex items-center justify-center py-3 px-2 first:pl-4 last:pr-4 hover:w-28 transition-all duration-300 ease-in-out"
              onMouseEnter={() => setIndexHovered(index)}
            >
              <div className=" bg-amber-300 rounded-full h-full aspect-square flex items-center justify-center">
                {item}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export {
  MagnifiedDock
}