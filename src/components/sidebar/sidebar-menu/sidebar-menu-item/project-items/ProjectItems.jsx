import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteBoard
} from "../../../../../features/boards/boardsSlice";

import SidebarMenuItem from "../SidebarMenuItem";
import ProjectItem from "./ProjectItem";
import AddProject from "../AddProject";

import { PiSquaresFourBold } from "react-icons/pi";

export default function ProjectItems() {
  const boards = useSelector(state => state.boards);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const limitedBoards = boards.slice(0, 10);

  function deleteProj(boardId) {
    dispatch(deleteBoard(boardId));
    navigate(`/projects`)
  }

  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex items-center justify-between">
        <p className="pl-1 text-left font-medium xl:text-lg dark:text-drkcol">
          Projects
        </p>
        <AddProject />
      </div>

      <div className="flex w-fit flex-col items-center gap-2.5">
        {limitedBoards.map((board) => (
          <ProjectItem
            key={board.id}
            projectName={board.name}
            handleDeleteProj={() => deleteProj(board.id)}
            boardId={board.id}
            boardImage={board.img}
          />
        ))}
      </div>
      <Link to={`/projects`}>
        <div className="text-[#365dff]">
          <SidebarMenuItem>
            <div className="flex items-center gap-2 p-2">
              <div className="col-start-1 col-end-2 row-start-1 row-end-2 flex h-[30px] w-[30px] items-center justify-center rounded-md">
                <PiSquaresFourBold className="h-[30px] w-[30px] rounded-md bg-blue-200 p-1.5 text-2xl dark:bg-[#365dff] dark:text-white" />
              </div>
              <p className="text-xs font-medium xl:text-sm">
                See all projects ({boards.length})
              </p>
            </div>
          </SidebarMenuItem>
        </div>
      </Link>
    </div>
  );
}