import GroupList from "./GroupList";
import SidebarHeader from "./SidebarHeader";

export default function Sidebar() {
  return (
    <div className="lg:w-[365px] border-r flex flex-col overflow-hidden">
      <SidebarHeader />
      <GroupList />
    </div>
  );
}
