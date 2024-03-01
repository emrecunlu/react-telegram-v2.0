import { cn } from "@/lib/utils";
import type { Group } from "@/types/group";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { sliceString } from "@/helpers";

type Props = {
  group: Group;
};

export default function GroupItem({ group }: Props) {
  const { id } = useParams();

  const getFormattedDateTime = (unixTime: number) => {
    const inputDate = new Date(unixTime);

    return formatDistanceToNow(inputDate, { includeSeconds: true });
  };

  return (
    <Link
      to={`/${group.id}`}
      className={cn("flex px-4 py-3 hover:bg-gray-50 space-x-4", {
        "bg-gray-50": group.id === id,
      })}
    >
      <div className="lg:w-12 lg:h-12 h-8 w-8 bg-blue-300 rounded-full">
        {group.photoURL && (
          <img
            src={group.photoURL}
            alt={group.name}
            className="lg:w-12 lg:h-12 h-8 w-8 object-cover object-center rounded-full"
          />
        )}
      </div>
      <div className="lg:flex flex-col flex-1 hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-sm font-medium text-zinc-600">
            {sliceString(group.name, 15)}
          </h1>
          <span className="ml-auto text-[11px] font-medium text-zinc-500">
            {group.lastMessage?.createdAt
              ? getFormattedDateTime(group.lastMessage.createdAt)
              : getFormattedDateTime(group.createdAt)}
          </span>
        </div>
        <span className="text-[12px] my-auto text-zinc-500 text-ellipsis overflow-hidden">
          {group.lastMessage?.message
            ? sliceString(group.lastMessage.message, 20)
            : "Chanel created"}
        </span>
      </div>
    </Link>
  );
}
