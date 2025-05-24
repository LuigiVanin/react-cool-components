'use client'
import Skeleton from "@/components/App/Skeleton";
import { MultiStepTab } from "@/components/gallery/multi-step-tabs";
import { useState } from "react";

const MultiStepTabsPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    <div key={1} className="p-4 h-40">
      <Skeleton className="h-7 w-full mb-2" animationType="wave" />
      <Skeleton className="h-7 w-full mb-2" animationType="wave" />
      <Skeleton className="h-7 w-1/2" animationType="wave" />



      <button onClick={() => setCurrentTab(1)}>Next</button>
    </div>,
    <div key={2} className="p-4 h-64">
      Teste 2
      <button onClick={() => setCurrentTab(2)}>Next</button>
    </div>,
    <div key={3} className="p-4 h-96">
      Teste 2
      <button onClick={() => setCurrentTab(3)}>Finish</button>
    </div>,
    <div key={4} className="p-4 h-96">
      Teste 2
      <button onClick={() => setCurrentTab(4)}>Mais um super teste</button>
    </div>,
    <div key={5} className="p-4 h-96">
      Teste 2
      <button onClick={() => setCurrentTab(5)}>Finish</button>
    </div>,
    <div key={1} className="p-4 h-40">
      Teste 1
      <button onClick={() => setCurrentTab(1)}>Next</button>
    </div>,

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