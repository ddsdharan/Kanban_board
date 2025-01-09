import { useState, useRef, useEffect } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import DropMenu from "../ui-components/DropMenu";
import useDarkMode from "../../hooks/usedarkMode";
import SearchResults from "./SearchResults";
import AddProject from "../sidebar/sidebar-menu/sidebar-menu-item/AddProject"
import { useSelector } from "react-redux";

import {
  PiList,
  PiX,
  PiGear,
  PiBell,
  PiMagnifyingGlassBold,
  PiSun,
  PiMoonStars,
  PiSquaresFour,
  PiSquaresFourDuotone,
  PiColumns,
  PiColumnsDuotone,
  PiTimer,
  PiTimerDuotone,
  PiUsers,
  PiUsersDuotone,
  PiChatsCircle,
  PiChatsCircleDuotone,
  PiQuestion,
  PiQuestionDuotone,
  PiChartBar,
  PiChartBarDuotone,
  PiSignOut,
} from "react-icons/pi";

import prof from "../../assets/DDLogo.png";
import logo from "../../assets/kanban-logo.png"

export default function Header() {
  const mobMenuIcons = [
    {
      id: 1,
      icon: <PiSquaresFour />,
      activeIcon: <PiSquaresFourDuotone />,
      iconText: "All Projects",
      path: "/projects",
      active: false,
    },
    {
      id: 2,
      icon: <PiTimer />,
      activeIcon: <PiTimerDuotone />,
      iconText: "Time Management",
      path: "/time",
      active: false,
    },
    {
      id: 3,
      icon: <PiUsers />,
      activeIcon: <PiUsersDuotone />,
      iconText: "Members",
      path: "/members",
      active: false,
    },
    {
      id: 4,
      icon: <PiChatsCircle />,
      activeIcon: <PiChatsCircleDuotone />,
      iconText: "Chat",
      path: "/chat",
      active: false,
    },
    {
      id: 5,
      icon: <PiQuestion />,
      activeIcon: <PiQuestionDuotone />,
      iconText: "FAQ's",
      path: "/faq",
      active: false,
    },
    {
      id: 6,
      icon: <PiChartBar />,
      activeIcon: <PiChartBarDuotone />,
      iconText: "Analytics",
      path: "/stats",
      active: false,
    },
    {
      id: 7,
      icon: <PiSignOut />,
      iconText: "Log out",
      path: "/",
      active: false,
    },
  ];

  const [mobMenuIsOpen, setMobMenuIsOpen] = useState(false);
  const [mobMenu, setMobMenu] = useState(mobMenuIcons);
  const [theme, toggleTheme] = useDarkMode();
  const [isOpen, setIsOpen] = useState({
    settings: false,
    notifications: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const location = useLocation();
  const boards = useSelector((state) => state.boards);

  useEffect(() => {
  const isProjectPage = matchPath({ path: "/project/*" }, location.pathname);
    setMobMenu((prevState) =>
      prevState.map((icon) => {
        const isActive =
          icon.path === location.pathname ||
          (icon.iconText === "Board" && isProjectPage);

        return { ...icon, active: isActive };
      }),
    );
  }, [location.pathname]);

  const handleClick = (btn) => {
    setIsOpen(prevState => ({
      ...prevState,
      [btn]: !prevState[btn],
    }));
  }

  const handleClickIcon = (clickedIconID) => {
    setMobMenu((prevState) =>
      prevState.map((icon) =>
        icon.id === clickedIconID
          ? { ...icon, active: true }
          : { ...icon, active: false },
      ),
    );
    setTimeout(() => {
      setMobMenuIsOpen(false);
    }, 275)
  }

  const handleMobProjClick = () => {
    setMobMenuIsOpen(false);
  }

  const isProjectPage = matchPath({ path: "/project/*" }, location.pathname);

  return (
    <header className="fixed right-0 top-0 h-[80px] w-full border-b bg-white p-5 sm:border-x lg:w-[calc(100%_-_25vw)] 2xl:w-[calc(100%_-_20vw)] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-shrink-0 lg:hidden">
          <Link to={`/`}>
            <img src={logo} alt="Kanban Logo" className="h-auto w-[45px]" />
          </Link>
        </div>
        <div className="relative flex h-[40px] w-[100%] items-center gap-2 rounded-md bg-[#f7f7f7] px-2 py-3 lg:w-[60%] dark:bg-drkbg2 dark:text-drkcol">
          <PiMagnifyingGlassBold className="text-lg" />
          <input
            className="w-[100%] border-none bg-[transparent] p-0 text-sm font-medium text-black outline-none focus:ring-0 dark:text-drkcol"
            type="search"
            name="searchcards"
            id="searchcards"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ref={searchInputRef}
          />
          <div className="absolute left-[-81px] top-[55px] w-[100vw] rounded-b-md bg-[#f7f7f7] sm:left-0 sm:top-[35px] sm:w-full dark:bg-drkbg2 dark:text-drkcol">
            <SearchResults
              search={searchQuery}
              setSearch={setSearchQuery}
              searchInputRef={searchInputRef}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 lg:hidden">
            {theme === "dark" ? (
              <div
                onClick={toggleTheme}
                className="hover:bg-hvrcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px] dark:text-drkcol"
              >
                <PiSun />
              </div>
            ) : (
              <div
                onClick={toggleTheme}
                className="hover:bg-hvrcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px] dark:text-drkcol"
              >
                <PiMoonStars />
              </div>
            )}
            {mobMenuIsOpen ? (
              <div
                onClick={() => setMobMenuIsOpen((prevState) => !prevState)}
                className="hover:bg-hvrcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-3xl dark:text-drkcol"
              >
                <PiX className="z-50" />
              </div>
            ) : (
              <div
                onClick={() => setMobMenuIsOpen((prevState) => !prevState)}
                className="hover:bg-hvrcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-3xl dark:text-drkcol"
              >
                <PiList className="z-50" />
              </div>
            )}
          </div>
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <DropMenu
              trigger={
                <div
                  onClick={() => handleClick("settings")}
                  className="hover:bg-hvrcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px] dark:text-drkcol"
                >
                  <PiGear />
                </div>
              }
              pos={`left-0`}
              isOpen={isOpen.notifications}
            >
              <p className="text-sm">Settings</p>
            </DropMenu>
            <DropMenu
              trigger={
                <div
                  onClick={() => handleClick("notifications")}
                  className="hover:bg-hvrcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px] dark:text-drkcol"
                >
                  <PiBell />
                </div>
              }
              pos={`left-0`}
              isOpen={isOpen.notifications}
            >
              <p className="text-sm">Notifcations</p>
            </DropMenu>
            {theme === "dark" ? (
              <div
                onClick={toggleTheme}
                className="hover:bg-hvrcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px] dark:text-drkcol"
              >
                <PiSun />
              </div>
            ) : (
              <div
                onClick={toggleTheme}
                className="hover:bg-hvrcol dark:hover:bg-drkhvrcol relative cursor-pointer rounded-full bg-transparent p-2 text-[25px] dark:text-drkcol"
              >
                <PiMoonStars />
              </div>
            )}
            <DropMenu
              trigger={
                <div className="flex cursor-pointer items-center gap-2">
                  <div className="h-7 w-7 overflow-hidden rounded-full">
                    <img src={prof} alt="profilepic" />
                  </div>
                  <p className="text-sm font-medium">Sasidharan D</p>
                </div>
              }
              pos={`right-0`}
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xs">ACCOUNT</p>
                  <div className="flex items-center gap-2">
                    <div className="h-[35px] w-[35px] overflow-hidden rounded-full">
                      <img src={prof} alt="profilepic" />
                    </div>
                    <div>
                      <p className="text-sm">Sasidharan D</p>
                      <p className="text-xs">ddsdharan@outlook.com</p>
                    </div>
                  </div>
                </div>

                <hr />

                <div className="flex flex-col gap-2">
                  <p className="text-xs">MENU</p>
                  <nav className="flex flex-col gap-3 text-sm">
                    <a href="/">Profile</a>
                    <a href="/">Boards</a>
                    <a href="/">Cards</a>
                    <a href="/">Settings</a>
                  </nav>
                </div>

                <hr />

                <div>
                  <a href="/" className="text-sm">
                    Log out
                  </a>
                </div>
              </div>
            </DropMenu>
          </div>
        </div>
      </div>

      {/* Mob menu */}
      {mobMenuIsOpen && (
        <div className="no-scrollbar absolute left-0 top-[80px] z-[-1] flex h-[calc(100vh_-_80px)] w-[100vw] flex-col gap-[50px] overflow-y-scroll bg-[#f7f7f7] p-6 lg:hidden dark:bg-drkbg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-7 w-7 overflow-hidden rounded-full">
                <img src={prof} alt="profilepic" />
              </div>
              <p>D Sasidharan</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl">
                <PiGear />
              </div>
              <div className="text-2xl">
                <PiBell />
              </div>
            </div>
          </div>
          <nav className="flex flex-col gap-7">
            <div className="dark:text-drkcol">
              <div className="mb-2 flex items-center gap-3">
                <div
                  className={`duration-400 flex items-center gap-3 transition-all ease-in-out`}
                >
                  {isProjectPage ? (
                    <div className="border-l-[6px] border-l-[#365dff] p-1 text-2xl">
                      <PiColumnsDuotone className="text-[#365dff]" />
                    </div>
                  ) : (
                    <div className="rounded-md p-1 text-2xl">
                      <PiColumns />
                    </div>
                  )}
                </div>
                <p>Projects:</p>
              </div>
              <div
                id="mobProjects"
                className="flex flex-wrap items-center gap-5 rounded-md border p-3 dark:border-drkbrd"
              >
                {boards.map((board) => (
                  <Link
                    key={board.id}
                    to={`/project/${board.id}/tasks`}
                    onClick={handleMobProjClick}
                  >
                    <div className="h-[30px] w-[30px] cursor-pointer">
                      <img
                        src={board.img}
                        alt={board.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </Link>
                ))}
                <AddProject />
              </div>
            </div>
            {mobMenu.map((item) => (
              <div key={item.id} className="dark:text-drkcol">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 ${
                    item.active
                      ? `border-l-[6px] border-l-[#365dff] text-[#365dff]`
                      : ""
                  } duration-400 transition-all ease-in-out`}
                  onClick={() => handleClickIcon(item.id)}
                >
                  <div className="rounded-md p-1 text-2xl">
                    {item.active ? item.activeIcon : item.icon}
                  </div>
                  <p>{item.iconText}</p>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
