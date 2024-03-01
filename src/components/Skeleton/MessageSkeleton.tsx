import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type Props = {
  align: "left" | "right";
};

export default function MessageSkeleton({ align = "left" }: Props) {
  return (
    <div
      className={cn("flex", {
        "justify-end": align === "right",
      })}
    >
      <Skeleton
        className={cn("w-10 h-10 rounded-full", {
          "order-1 ml-4": align === "right",
        })}
      />
      <Skeleton
        className={cn("lg:max-w-64 w-full h-14 rounded ml-4 mt-2 flex-1")}
      />
    </div>
  );
}
