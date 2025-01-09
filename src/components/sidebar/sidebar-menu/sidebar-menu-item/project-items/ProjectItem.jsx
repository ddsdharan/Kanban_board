import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editBoardName } from "../../../../../features/boards/boardsSlice";

import SidebarMenuItem from "../SidebarMenuItem";
import DropMenu from "../../../../ui-components/DropMenu";
import useTruncate from "../../../../../hooks/useTruncate";

import {
  PiDotsThreeOutlineVerticalFill,
  PiNotePencilBold,
  PiTrashBold,
} from "react-icons/pi";

export default function ProjectItem({ projectName, handleDeleteProj, boardId, boardImage }) {
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(projectName);
  const dispatch = useDispatch();

  const truncatedProjectName = useTruncate(newName, 30);

  function handleInputChange(event) {
    setNewName(event.target.value);
  }

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isEditing &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        if (newName.trim() !== projectName.trim()) {
          dispatch(editBoardName({ id: boardId, newName }));
        }
        setIsEditing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing, boardId, newName, dispatch, projectName]);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
        if (newName.trim() !== projectName.trim()) {
          dispatch(editBoardName({ id: boardId, newName }));
        }
        setIsEditing(false);
    }
  }

  return (
    <SidebarMenuItem className="relative">
      <div className="flex w-full items-center justify-between">
        <Link
          to={`/project/${boardId}/tasks`}
          className="basis-[95%] cursor-pointer p-2"
        >
          <div className="flex items-center gap-2">
            <div
              className={`col-start-1 col-end-2 row-start-1 row-end-2 flex h-[35px] w-[35px] items-center justify-center rounded-md ${isEditing ? `basis-[45px]` : `basis-[35px]`}`}
            >
              <img
                src={boardImage}
                alt={`${projectName} boardimage`}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={handleInputChange}
                ref={inputRef}
                onKeyDown={handleKeyPress}
                className="block w-full rounded-md border-0 py-1.5 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 dark:text-drkbg"
              />
            ) : (
              <p className="text-xs font-medium xl:text-sm">
                {truncatedProjectName}
              </p>
            )}
          </div>
        </Link>
        <div className="flex pr-2">
          {!isEditing ? (
            <DropMenu
              trigger={
                <div className="relative cursor-pointer rounded-full bg-transparent p-2 hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol">
                  <PiDotsThreeOutlineVerticalFill />
                </div>
              }
              pos={`right-[0px]`}
            >
              <nav className="flex flex-col items-start gap-2 text-sm">
                <button
                  onClick={() => setIsEditing(true)}
                  className="relative flex w-full cursor-pointer items-center gap-x-2 rounded-md bg-transparent"
                >
                  <PiNotePencilBold />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    handleDeleteProj(boardId);
                  }}
                  className="relative flex cursor-pointer items-center gap-x-2 rounded-md bg-transparent"
                >
                  <PiTrashBold />
                  <span>Delete</span>
                </button>
              </nav>
            </DropMenu>
          ) : null}
        </div>
      </div>
    </SidebarMenuItem>
  );
}
