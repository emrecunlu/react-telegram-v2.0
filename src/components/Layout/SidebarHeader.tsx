import { AiOutlineSearch } from "react-icons/ai";

export default function SidebarHeader() {
  return (
    <div className="h-14 lg:flex items-center px-4 hidden ">
      <label
        htmlFor="search"
        className="flex items-center justify-between bg-zinc-100 rounded-full px-4 w-full"
      >
        <AiOutlineSearch size={20} className="text-zinc-600 ml-2" />
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="outline-none h-10 bg-transparent flex-1 px-4 text-zinc-600"
        />
      </label>
    </div>
  );
}
