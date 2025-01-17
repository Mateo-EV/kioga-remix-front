import { Skeleton } from "@/components/ui/skeleton";

const GalleryProductsSkeleton = () => {
  return (
    <div className="grid flex-1 auto-rows-[200px] grid-cols-[repeat(auto-fill,minmax(min(250px,100%),1fr))] gap-4 md:auto-rows-[400px]">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-full" />
      ))}
    </div>
  );
};

export default GalleryProductsSkeleton;
