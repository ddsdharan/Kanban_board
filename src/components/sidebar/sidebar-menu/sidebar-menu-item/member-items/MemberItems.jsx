import { Link } from "react-router-dom";
import SidebarMenuItem from "../SidebarMenuItem";
import MemberItem from "./MemberItem"
import members from "../../../../../data/members";

import { PiUsersBold } from "react-icons/pi";

export default function MemberItems() {

  const limitedMembers = members.slice(0, 5);

  return (
    <div className="flex flex-col gap-3">
      <p className="mb-2 pl-1 font-medium xl:text-lg dark:text-drkcol">
        Team members
      </p>
      <div className="flex w-fit flex-col items-center gap-2.5">
        {limitedMembers.map((member) => (
          <MemberItem key={member.id} img={member.img} name={member.name} />
        ))}
      </div>
      <Link to={`/members`}>
        <div className="text-[#365dff]">
          <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2">
              <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex h-[30px] w-[30px] items-center justify-center rounded-md">
                <PiUsersBold className="h-[30px] w-[30px] rounded-md bg-blue-200 p-1.5 text-2xl dark:bg-[#365dff] dark:text-white" />
              </div>
              <p className="text-xs font-medium xl:text-sm">
                See all members ({members.length})
              </p>
            </div>
          </SidebarMenuItem>
        </div>
      </Link>
    </div>
  );
}