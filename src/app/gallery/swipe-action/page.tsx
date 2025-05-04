"use client"
import SwipeAction from "@/components/gallery/swipe-action"
import { EditIcon, LoaderCircleIcon, Trash2Icon, TvIcon } from "lucide-react"
import { useState } from "react"

const SwipeActionPage = () => {
  const [fakeLoading, setFakeLoading] = useState(false)

  const customAction = (payload: { close: () => void, x: number }) => {
    if (fakeLoading) return
    setFakeLoading(true)

    setTimeout(() => {
      payload.close()
      setFakeLoading(false)
      payload.close()
      alert(`Action completed with x: ${payload.x}`)
    }, 2000)
  }

  return (
    <main className="w-full min-h-full flex gap-2 items-center justify-center flex-col p-5">
      <SwipeAction
        snapLimit={200}
        className="w-80 cursor-pointer"
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
              className="cursor-pointer min-w-12 w-full bg-sky-400 text-white h-full absolute right-0 z-20 flex-center flex-col"
              onClick={() => customAction({ close, x })}
            >
              {
                fakeLoading ?
                  <LoaderCircleIcon className="animate-spin" /> :
                  <>
                    <p>
                      Action
                    </p>
                    <p>
                      <strong>
                        {Math.abs(x).toFixed(1)}px
                      </strong>
                    </p>
                  </>
              }
            </button>

          </div>
        }
      >

        <div className="flex items-start justify-start py-4 px-6 gap-3 bg-background dark:bg-calm-100">

          <TvIcon className="" />
          <div className="flex flex-col items-start justify-start">
            <h1 className="font-semibold">Action Card</h1>
            <p className="text-sm text-calm-500">
              Swipe right or left aby kind of action
            </p>
          </div>
        </div>

      </SwipeAction>

      <SwipeAction
        snapLimit={100}
        className="w-80 cursor-pointer"
        leftAction={({ close }) =>
          <div className="flex items-center justify-end w-full h-full overflow-x-hidden relative">
            <button
              className="cursor-pointer min-w-12 w-full bg-rose-500 text-white h-full absolute left-0 z-20 flex-center"
              onClick={close}
            >
              <Trash2Icon />
            </button>
          </div>
        }
      >
        <div className="bg-background dark:bg-calm-100 flex items-start justify-start py-4 px-6 gap-3">
          <div className="flex flex-col items-start justify-start">
            <h1 className="font-semibold">Action Card</h1>
            <p className="text-sm text-calm-500">
              Swipe right or left aby kind of action
            </p>
          </div>
        </div>

      </SwipeAction>
    </main>
  )
}

export default SwipeActionPage