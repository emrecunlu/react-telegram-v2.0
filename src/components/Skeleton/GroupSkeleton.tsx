import { Skeleton } from "../ui/skeleton";

export default function GroupSkeleton() {
  return (
    <div className="flex items-center justify-between space-x-4 px-4 py-2">
      <Skeleton className="lg:w-12 lg:h-12 w-8 h-8 rounded-full" />
      <div className="lg:flex flex-col flex-1 space-y-2 hidden">
        <Skeleton className="h-3 w-[50px]" />
        <Skeleton className="h-3 w-[150px]" />
      </div>
    </div>
  );
}
