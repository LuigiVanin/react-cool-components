'use client'
import { Skeleton, SkeletonGroup } from "@/components/gallery/skeleton";
import { MultiStepTab } from "@/components/gallery/multi-step-tabs";
import { useState } from "react";

const MultiStepTabsPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    <div key={1} className="p-4 flex flex-col gap-7 py-6">
      <SkeletonGroup lines={3} />
      <button
        className="cursor-pointer rounded-md bg-calm-800 py-1.5 px-3 text-background w-fit min-w-40 ml-auto"
        onClick={() => setCurrentTab(1)}
      >
        Next
      </button>
    </div>,
    <div key={2} className="py-6 p-4 flex flex-col gap-7">
      <div className="flex flex-row gap-3 items-center">
        <Skeleton className="h-20 min-w-20 rounded-full" />
        <SkeletonGroup lines={2} className="flex-1" />
      </div>
      <SkeletonGroup lines={2} className="flex-1" />
      <button
        className="cursor-pointer rounded-md bg-calm-800 py-1.5 px-3 text-background w-fit min-w-40 ml-auto"
        onClick={() => setCurrentTab(2)}
      >
        Next
      </button>
    </div>,
    <div key={3} className="py-6 p-4 flex flex-col gap-5">
      <Skeleton animationType="none" className="items-center gap-6 p-6" >
        <Skeleton className="h-24 w-24 max-w-24 rounded-full" animationType="wave" />
        <SkeletonGroup lines={3} />

        <footer className="w-full flex justify-end gap-2">
          <Skeleton className="h-10 w-24 max-w-24" animationType="wave" />
          <Skeleton className="h-10 w-24 max-w-24" animationType="wave" />
        </footer>
      </Skeleton>

      <button
        className="mt-4 cursor-pointer rounded-md bg-calm-800 py-1.5 px-3 text-background w-fit min-w-40 ml-auto"
        onClick={() => setCurrentTab(3)}
      >
        Next
      </button>
    </div>,
    <div key={4} className="py-6 p-4 flex flex-col gap-5">
      <Skeleton animationType="none" className="items-center gap-6 p-6" >
        <SkeletonGroup lines={3} />
        <SkeletonGroup lines={4} />
        <SkeletonGroup lines={2} />
        <SkeletonGroup lines={3} />
      </Skeleton>

      <button
        className="mt-4 cursor-pointer rounded-md bg-calm-800 py-1.5 px-3 text-background w-fit min-w-40 ml-auto"
        onClick={() => setCurrentTab(4)}
      >
        Next
      </button>
    </div>,
    <div key={5} className="py-6 p-4 flex flex-col gap-5">
      <SkeletonGroup lines={3} />
      <button
        className="cursor-pointer rounded-md bg-calm-800 py-1.5 px-3 text-background w-fit min-w-40 ml-auto"
        onClick={() => setCurrentTab(5)}
      >
        Next
      </button>

    </div>
  ]

  return (
    <div className="flex flex-col items-center justify-center h-screen w-96">
      <MultiStepTab
        currentTab={currentTab}
        tabs={tabs}
        onStepClick={(index) => setCurrentTab(index)}
      />
    </div>

  );
}

export default MultiStepTabsPage;