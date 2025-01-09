import ProjectItems from "./sidebar-menu-item/project-items/ProjectItems";
import MemberItems from "./sidebar-menu-item/member-items/MemberItems";
import TimeItem from "./sidebar-menu-item/TimeItem";

export default function SidebarMenu() {
  return (
    <div className="relative overflow-scroll h-[100%] flex flex-col items-center justify-between gap-6 px-5 py-10 no-scrollbar w-[80%]">
      <ProjectItems />
      <MemberItems />
      <TimeItem title={`Time`} />
    </div>
  );
}
