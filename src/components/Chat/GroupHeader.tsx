import { Group } from "@/types/group";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
type Props = {
  group: Group;
};

export default function GroupHeader({ group }: Props) {
  const getAvatarFallback = (name: string) => {
    return name
      .split(" ")
      .filter((_, index) => (index + 1 <= 2 ? true : false))
      .reduce(
        (prev, val) =>
          prev + (val.length > 0 ? val[0].toLocaleUpperCase() : ""),
        ""
      );
  };

  return (
    <header className="h-14 border-b flex items-center px-4 space-x-6">
      <Link to="/">
        <AiOutlineArrowLeft
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
          size={18}
        />
      </Link>
      <div className="flex lg:space-x-4">
        <div className="h-10 w-10 rounded-full lg:flex hidden items-center justify-center bg-blue-300">
          {(group.photoURL && (
            <img
              src={group.photoURL}
              className="w-10 h-10 rounded-full object-center object-cover"
              alt={group.name}
            />
          )) || (
            <span className="text-[13px] font-semibold text-white">
              {getAvatarFallback(group.name)}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-sm font-medium text-zinc-600">{group.name}</h1>
          <span className="text-[12px] mt-auto text-zinc-500">
            {group.createdBy.fullname}
          </span>
        </div>
      </div>
    </header>
  );
}
