import { useState, useEffect } from "react";
import SidebarMenuItem from "../SidebarMenuItem";
import { GoDotFill } from "react-icons/go";

export default function MemberItem({img, name}) {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("eo", { hour12: false })
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString("eo", { hour12: false }));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [])

  return (
    <SidebarMenuItem>
      <div className="flex items-center gap-2 p-2">
        <div className="basis-[40px] rounded-full">
          <img src={img} alt={name} className="rounded-lg" />
        </div>
        <div>
          <div>
            <p className="text-xs font-medium xl:text-sm">{name}</p>
          </div>
          <div className="flex items-start gap-1">
            <GoDotFill className="text-green-400" />
            <span className="text-xs">Online - {time}</span>
          </div>
        </div>
      </div>
    </SidebarMenuItem>
  );
}