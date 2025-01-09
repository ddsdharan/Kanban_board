import { Outlet, useLocation } from "react-router-dom";
import MainViewHeader from "./mainview-header/MainViewHeader.jsx";

export default function MainView() {
  const location = useLocation();
  const isProjects = location.pathname === "/projects";
  const isMembers = location.pathname === "/members";

  return (
    <main className="w-full lg:w-[calc(100%_-_25vw)] 2xl:w-[calc(100%_-_20vw)]">
      {isProjects || isMembers ? (
        <>
          <Outlet />
        </>
      ) : (
        <>
          <MainViewHeader />
          <Outlet />
        </>
      )}
    </main>
  );
}