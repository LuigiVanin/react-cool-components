"use client"
import { motion, useMotionValue, animate } from "motion/react";
import { TvIcon } from "lucide-react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const SNAP_LIMIT = 130;

type SwipeStatus = "left" | "right" | "none";

type SwipeActionProps = {
  className?: string;
  rightAction?: ReactNode | ((payload: { status: SwipeStatus, close: () => void, x: number }) => ReactNode);
  leftAction?: ReactNode | ((payload: { status: SwipeStatus, close: () => void, x: number }) => ReactNode);
}

const SwipeAction = ({ leftAction, rightAction, className }: SwipeActionProps) => {
  const swiperAcitionContainerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [xState, setXState] = useState(0);
  const [swipeStatus, setSwipeStatus] = useState<SwipeStatus>("none");

  useEffect(() => {
    const unsubscribe = x.on("change", () => {
      setXState(x.get());

      if (x.get() < -(SNAP_LIMIT / 3)) {
        setSwipeStatus("left");
      } else if (x.get() > SNAP_LIMIT / 3) {
        setSwipeStatus("right");
      } else {
        setSwipeStatus("none");
      }
    });

    return () => unsubscribe();
  }, [x]);

  const handleDragEnd = () => {
    if (swipeStatus === "left") {
      // Snap to -100px
      animate(x, -SNAP_LIMIT, { ease: [0.4, 0, 0.2, 1] });
    } else if (swipeStatus === "right") {
      // Snap to 100px (if needed)
      animate(x, SNAP_LIMIT, { ease: [0.4, 0, 0.2, 1] });
    } else {
      // Snap back to 0
      animate(x, 0);
    }
  };

  const closeDraggableItem = () => {
    if (swipeStatus !== 'none') {
      animate(x, 0, { ease: [0.4, 0, 0.2, 1] });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p>
        {/* {xState} */}
      </p>
      <p>
        {swipeStatus}
      </p>
      <motion.div
        ref={swiperAcitionContainerRef}
        className={cn("swipe-action__container group overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow duration-200 rounded-lg border border-calm-200 flex-center", className)}
      >
        <motion.div
          className="swipe-action--left h-full flex items-start justify-betweencursor-pointer ease-in-out absolute left-0 z-10 rounded-l-lg "
          style={{
            width: Math.max(xState, 0)
          }}>
          {
            typeof leftAction === "function"
              ? leftAction({ status: swipeStatus, close: closeDraggableItem, x: xState })
              : leftAction
          }
        </motion.div>

        <motion.div
          className="swipe-action--right h-full  flex items-start justify-betweencursor-pointer ease-in-out absolute right-0 z-10 rounded-r-lg"
          style={{
            width: Math.max(xState * -1, 0)
          }}
        >

          {
            typeof rightAction === "function"
              ? rightAction({ status: swipeStatus, close: closeDraggableItem, x: xState })
              : rightAction
          }

        </motion.div>

        <motion.div
          className="swipe-action  bg-background/80 dark:bg-calm-100 flex items-start justify-between py-4 px-6 gap-3 cursor-pointer ease-in-out z-30"
          whileDrag={{ cursor: "grabbing !important" }}
          drag="x"
          style={{
            x,
          }}
          dragMomentum={false}
          dragElastic={0.2}
          dragConstraints={{
            left: -SNAP_LIMIT,
            right: SNAP_LIMIT,
          }}

          onDragEnd={handleDragEnd} // Handle snapping on drag end
          onClick={closeDraggableItem} // Handle click to reset
        >
          <TvIcon className="" />
          <div className="flex flex-col items-start justify-start">
            <h1 className="font-semibold">Action Card {xState.toFixed(2)}</h1>
            <p className="text-sm text-calm-500">
              Swipe right or left aby kind of action
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SwipeAction;