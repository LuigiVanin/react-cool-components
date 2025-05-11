"use client"
import { Coffee, Home, Accessibility, Sun, Magnet, Moon, AlarmCheck, PenTool } from "lucide-react"
import { MagnifiedDock } from "@/components/gallery/magnified-dock";

const MagnifiedDockPage = () => {
  const items = [
    Coffee, Home, Accessibility, Sun, Magnet, Moon, AlarmCheck, PenTool
  ]


  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl font-bold mb-10">Magnified Dock</h1>
      <MagnifiedDock items={items} size="md">
        {(Item) => (
          <div className="h-full w-full rounded-full bg-calm-200/50 flex-center cursor-pointer">
            <Item className="w-8 h-8 text-foreground" />
          </div>
        )}
      </MagnifiedDock>
    </div>
  );
}

export default MagnifiedDockPage;