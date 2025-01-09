import { useState, useEffect } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";

import {
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

import logo from "../../assets/kanban-logo.png";

const sidebarIcons = [
  {
    id: 1,
    icon: <PiSquaresFour />,
    activeIcon: <PiSquaresFourDuotone />,
    iconText: "Projects",
    path: "/projects",
    active: false,
  },
  {
    id: 2,
    icon: <PiColumns />,
    activeIcon: <PiColumnsDuotone />,
    iconText: "Board",
    path: "/project/1/tasks",
    active: false,
  },
  {
    id: 3,
    icon: <PiTimer />,
    activeIcon: <PiTimerDuotone />,
    iconText: "Time Management",
    path: "/time",
    active: false,
  },
  {
    id: 4,
    icon: <PiUsers />,
    activeIcon: <PiUsersDuotone />,
    iconText: "Members",
    path: "/members",
    active: false,
  },
  {
    id: 5,
    icon: <PiChatsCircle />,
    activeIcon: <PiChatsCircleDuotone />,
    iconText: "Chat",
    path: "/chat",
    active: false,
  },
  {
    id: 6,
    icon: <PiQuestion />,
    activeIcon: <PiQuestionDuotone />,
    iconText: "FAQ's",
    path: "/faq",
    active: false,
  },
  {
    id: 7,
    icon: <PiChartBar />,
    activeIcon: <PiChartBarDuotone />,
    iconText: "Analytics",
    path: "/stats",
    active: false,
  },
];

export default function SidebarIcons() {
  const location = useLocation();
  const [icons, setIcons] = useState(sidebarIcons);

 
  useEffect(() => {
    const isProjectPage = matchPath({ path: "/project/*" }, location.pathname);
    setIcons((prevState) =>
      prevState.map((icon) => {
        const isActive =
          icon.path === location.pathname ||
          (icon.iconText === "Board" && isProjectPage);

        return { ...icon, active: isActive };
      }),
    );
  }, [location.pathname]);

  function handleClickIcon(clickedIconID) {
    setIcons((prevState) =>
      prevState.map((icon) =>
        icon.id === clickedIconID
          ? { ...icon, active: true }
          : { ...icon, active: false },
      ),
    );
  }

  return (
    <div className="flex w-[20%] flex-col items-center justify-between border-r pb-10 pt-5 dark:border-drkbrd dark:bg-drkbg dark:text-drkcol">
      <div className="flex w-full flex-col items-center gap-[5vh]">
        <div className="w-[40px]">
          <Link to={`/`}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="flex w-full flex-col items-center gap-[4vh] text-3xl text-[#959697] dark:text-drkcol">
          {icons.map((icon) => (
            <Link
              to={icon.path}
              key={icon.id}
              alt={icon.iconText}
              title={icon.iconText}
              className={`${
                icon.active
                  ? `border-l-[6px] border-l-[#365dff] text-[#365dff]`
                  : ""
              } duration-400 flex h-[50px] w-full cursor-pointer items-center justify-center transition-all ease-in-out`}
              onClick={() => handleClickIcon(icon.id)}
            >
              {icon.active ? icon.activeIcon : icon.icon}
            </Link>
          ))}
        </div>
      </div>
      <div className="cursor-pointer text-4xl text-[#a4a6a8] dark:text-drkcol">
        <a href="#" className="flex w-full cursor-pointer justify-center">
          <PiSignOut />
        </a>
      </div>
    </div>
  );
}
