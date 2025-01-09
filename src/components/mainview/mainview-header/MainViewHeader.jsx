import ProjectProgress from "./ProjectProgress";
import MainViewNav from "./MainViewNav";
import MainViewMembers from "./MainViewMembers";
import MainViewItems from "./MainViewItems";

export default function MainViewHeader() {

  return (
    <div id="mainviewheader" className="fixed right-0 top-[80px] z-[-1] grid h-[150px] w-full grid-cols-2 grid-rows-[auto_auto] gap-y-6 border-x border-b bg-white px-4 pt-4 sm:px-5 sm:pt-5 lg:w-[calc(100%_-_25vw)] 2xl:w-[calc(100%_-_20vw)] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol">
      <ProjectProgress />
      <MainViewNav />
      <MainViewMembers />
      <MainViewItems />
    </div>
  );
}