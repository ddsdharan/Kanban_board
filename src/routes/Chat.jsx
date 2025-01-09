import MainContainer from "../components/ui-components/MainContainer";
import { useSelector } from "react-redux";

export default function Chat() {
  const boards = useSelector((state) => state.boards);
  

  return (
    <MainContainer title={`Chat`} subtitle={`A list of the total notes in each project`}>
      <div className="flex flex-col gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="flex items-center gap-2 rounded-md border p-3 dark:border-drkbrd"
          >
            <div
              className={`col-start-1 col-end-2 row-start-1 row-end-2 flex h-[35px] w-[35px] items-center justify-center rounded-md`}
            >
              <img
                src={board.img}
                alt={`${board.name} board image`}
                className="h-full w-full rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-medium">{board.name}</p>
              <p className="text-sm">Project notes: {board.notes.length}</p>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
}
