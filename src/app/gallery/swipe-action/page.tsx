"use client"
import SwipeAction from "@/components/Gallery/swipe-action"
import { EditIcon, Trash2Icon } from "lucide-react"

const SwipeActionPage = () => {
  return (
    <main className="w-full min-h-full flex gap-5 items-center justify-center p-5">
      <SwipeAction
        className="w-auto"
        leftAction={({ close }) =>
          <div className="flex items-center justify-end w-full h-full overflow-x-hidden relative">
            <button
              className="cursor-pointer min-w-12 w-1/2 bg-rose-500 text-white h-full absolute left-0 z-20 flex-center"
              onClick={close}
            >

              <Trash2Icon />
            </button>
            <button
              className="cursor-pointer min-w-12 w-1/2 bg-amber-400 h-full z-10 text-white flex-center"
              onClick={close}
            >
              <EditIcon />
            </button>
          </div>
        }
        rightAction={({ close, x }) =>
          <div className="flex items-center justify-end w-full h-full overflow-x-hidden relative">
            <button
              className="cursor-pointer min-w-12 w-full bg-sky-400 text-white h-full absolute right-0 z-20 flex-center"
              onClick={close}
            >
              {Math.abs(x).toFixed(1)}
            </button>

          </div>
        }
      />
    </main>
  )
}

export default SwipeActionPage