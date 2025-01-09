import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { RiMedal2Fill } from "react-icons/ri";

export default function ProjectProgress() {
  const { boardId } = useParams();
  const board = useSelector((state) =>
    state.boards.find((board) => board.id === parseInt(boardId)),
  );
   if (!boardId || !board) {
     return null;
   }

  const totalCards = board.lists.reduce(
    (total, list) => total + list.cards.length,
    0,
  );
  const completedCards = board.lists[2].cards.length;
  const percentageComplete = Math.round((completedCards / totalCards) * 100);
  

  let progressColour;
  if (percentageComplete < 20) {
    progressColour = `#365dff`;
  } else if (percentageComplete < 40) {
    progressColour = `#188af0`;
  } else if (percentageComplete < 60) {
    progressColour = `#00b7d8`;
  } else if (percentageComplete < 80) {
    progressColour = `#00d4b0`;
  } else if (percentageComplete < 90) {
    progressColour = `#07b741`;
  } else if (percentageComplete <= 100) {
    progressColour = `#22c55e`;
  }


  return (
    <div className="col-start-1 col-end-2 row-start-1 row-end-2 grid grid-cols-[50px_auto] items-center gap-3">
      <div
        className={`col-start-1 col-end-2 row-start-1 row-end-2 flex h-[50px] w-[50px] items-center justify-center rounded-md`}
      >
        <img
          src={board.img}
          alt={`${board.name} boardimage`}
          className="h-full w-full rounded-md object-cover"
        />
      </div>
      <div className="flex w-[100%] flex-col justify-between gap-1">
        <div className="flex items-center gap-3">
          <p className="whitespace-nowrap font-medium lg:text-lg">
            {board.name}
          </p>
          {percentageComplete === 100 ? (
            <div className="flex items-center justify-start">
              <RiMedal2Fill className="text-2xl text-[#ffbf00]" />
            </div>
          ) : null}
        </div>
        <div className="md:flex md:items-center md:gap-2">
          <div className="h-2.5 w-[100%] rounded-full bg-gray-200">
            <div
              className="duration-400 h-2.5 rounded-full transition-all ease-in-out"
              style={{
                width: `${percentageComplete}%`,
                backgroundColor: progressColour,
              }}
            ></div>
          </div>
          <div className="w-[auto]">
            <span className="whitespace-nowrap text-sm font-normal text-[#8f959f] dark:text-drkcol">
              {percentageComplete ? `${percentageComplete}%` : `0%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
