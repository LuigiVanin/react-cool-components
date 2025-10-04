import { DialogBottom } from "@/components/gallery/dialog-bottom";

export default function DialogBottomPage() {
  return (
    <main className="w-full min-h-full flex gap-5 items-center justify-center p-5">
      <DialogBottom>
        <h1 className="text-xl text-calm-600 font-bold">
          Enable Location Services
        </h1>

        <p className=" text-calm-500/90 text-center mb-4">
          Please enable location services to find nearby stores and offers.
        </p>
      </DialogBottom>
    </main>
  );
}
