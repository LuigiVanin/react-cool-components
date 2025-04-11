import { MagnifiedDock } from "@/components/Gallery/MagnifiedDock";

const MagnifiedDockPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-3xl font-bold mb-10">Magnified Dock</h1>
      <MagnifiedDock />
    </div>
  );
}

export default MagnifiedDockPage;