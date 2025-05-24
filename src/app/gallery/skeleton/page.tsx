import Skeleton, { SkeletonGroup } from "@/components/gallery/skeleton";

const SkeletonPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="w-full max-w-96 flex flex-col gap-5 relative">
        <Skeleton className="h-9 w-9 absolute top-0 right-0" animationType="wave" />

        <Skeleton className="h-9 w-2/3" animationType="wave" />
        <SkeletonGroup lines={4} className="mb-8 " />
      </div>

      <Skeleton animationType="none" className="items-center gap-6 p-6 w-full max-w-96" >
        <Skeleton className="h-24 w-24 max-w-24 rounded-full" animationType="wave" />
        <SkeletonGroup lines={4} className="mb-5" />

        <footer className="w-full flex justify-end gap-2">
          <Skeleton className="h-10 w-24 max-w-24" animationType="wave" />
          <Skeleton className="h-10 w-24 max-w-24" animationType="wave" />
        </footer>
      </Skeleton>

    </div>
  );
}

export default SkeletonPage;