import SidebarIcons from "./SidebarIcons";
import SidebarMenu from "../sidebar/sidebar-menu/SidebarMenu";


export default function Sidebar() {

  return (
        <aside className="fixed bottom-0 hidden left-0 top-0 z-0 h-[100%] w-[25vw] lg:flex 2xl:w-[20vw] dark:border-drkbrd dark:bg-drkbg">
          <SidebarIcons />
          <SidebarMenu />
        </aside>
  );
}
