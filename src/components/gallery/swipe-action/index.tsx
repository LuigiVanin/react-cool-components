"use client"
import { motion, useMotionValue, animate } from "motion/react";
import { forwardRef, PropsWithChildren, ReactNode, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

const SNAP_LIMIT = 130;

type SwipeStatus = "left" | "right" | "none";

type SwipeActionProps = PropsWithChildren<{
  className?: string;
  rightAction?: ReactNode | ((payload: { status: SwipeStatus, close: () => void, x: number }) => ReactNode);
  leftAction?: ReactNode | ((payload: { status: SwipeStatus, close: () => void, x: number }) => ReactNode);
  snapLimit?: number;
}>

const SwipeAction = forwardRef<HTMLDivElement, SwipeActionProps>(
  ({ children, leftAction, rightAction, className, snapLimit = SNAP_LIMIT }, ref) => {
    const x = useMotionValue(0);
    const [xState, setXState] = useState(0);
    const [swipeStatus, setSwipeStatus] = useState<SwipeStatus>("none");

    useEffect(() => {
      const unsubscribe = x.on("change", () => {
        setXState(x.get());

        if (x.get() < -(snapLimit / 2) && rightAction) {
          setSwipeStatus("left");
        } else if (x.get() > snapLimit / 2 && leftAction) {
          setSwipeStatus("right");
        } else {
          setSwipeStatus("none");
        }
      });

      return () => unsubscribe();
    }, [x, leftAction, rightAction, snapLimit]);

    const handleDragEnd = () => {
      if (swipeStatus === "left") {
        // Snap to -100px
        animate(x, -snapLimit, { ease: [0.4, 0, 0.2, 1] });
      } else if (swipeStatus === "right") {
        // Snap to 100px (if needed)
        animate(x, snapLimit, { ease: [0.4, 0, 0.2, 1] });
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

    const dragConstraints = useMemo(() => {
      return {
        left: rightAction ? -snapLimit : 0,
        right: leftAction ? snapLimit : 0,
      }
    }, [snapLimit, leftAction, rightAction]);

    return (
      <motion.div
        ref={ref}
        className={cn("swipe-action__container group overflow-hidden relative shadow-sm group-hover:shadow-md transition-shadow duration-200 rounded-lg border border-calm-200 flex-center bg-background dark:bg-calm-100", className)}
      >
        <motion.div
          className="swipe-action--left h-full flex items-start justify-between ease-in-out absolute left-0 z-10 rounded-l-lg "
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
          className="swipe-action--right h-full  flex items-start justify-between ease-in-out absolute right-0 z-10 rounded-r-lg"
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
          className="swipe-action ease-in-out z-30 w-full "
          whileDrag={{ cursor: "grabbing" }}
          drag="x"
          style={{
            x,
          }}
          dragMomentum={false}
          dragElastic={0.15}
          dragConstraints={dragConstraints}
          onDragEnd={handleDragEnd} // Handle snapping on drag end
          onClick={closeDraggableItem} // Handle click to reset
          dragSnapToOrigin={false}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  });

SwipeAction.displayName = "SwipeAction";

export {
  SwipeAction,
}

export default SwipeAction;