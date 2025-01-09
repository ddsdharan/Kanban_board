import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import MainContainerWithHeader from "../components/ui-components/MainContainerWithHeader";

export default function Overview() {
  const { boardId } = useParams();
  const board = useSelector((state) =>
    state.boards.find((board) => board.id === parseInt(boardId)),
  );

  const totalCards = board.lists.reduce(
    (total, list) => total + list.cards.length,
    0,
  );

  const completedCards = board.lists[2].cards.length;

  const outstandingCards = totalCards - completedCards;

  const percentageComplete = Math.round((completedCards / totalCards) * 100);

  const cardsInLists = [
    {
      id: 1,
      listName: board.lists[0].name,
      listColour: board.lists[0].color,
      cards: board.lists[0].cards.length,
    },
    {
      id: 2,
      listName: board.lists[1].name,
      listColour: board.lists[1].color,
      cards: board.lists[1].cards.length,
    },
    {
      id: 3,
      listName: board.lists[2].name,
      listColour: board.lists[2].color,
      cards: board.lists[2].cards.length,
    },
  ]

  return (
    <MainContainerWithHeader>
      <div className="flex flex-col gap-4 border p-4 rounded-lg dark:border-drkbrd">
        <p className="text-md font-medium">{board.name} Overview:</p>
        <p>
          Completion:{" "}
          <span className="font-semibold">
            {percentageComplete ? percentageComplete : `0`}%
          </span>
        </p>
        <p>
          Total no. of cards:{" "}
          <span className="font-semibold">{totalCards}</span>
        </p>
        <div className="flex flex-col gap-3">
          {cardsInLists.map((list) => (
            <div key={list.id}>
              <div className="flex items-center gap-2">
                <div
                  className={`h-[12px] w-[12px] rounded-full`}
                  style={{ backgroundColor: list.listColour }}
                ></div>
                <p className="flex items-center gap-2">
                  {" "}
                  <span className="flex h-[10px] w-[10px] items-center justify-center rounded-md border bg-white p-3.5 font-semibold dark:border-drkbrd dark:bg-drkbg">
                    {list.cards}
                  </span>
                  in {list.listName}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p>
          Cards completed:{" "}
          <span className="font-semibold">{completedCards}</span>
        </p>
        <p>
          Cards outstanding:{" "}
          <span className="font-semibold">{outstandingCards}</span>
        </p>
        <div className="flex items-start gap-3 flex-col xs:flex-row xs:items-center">
          <p>
            Active members{" "}
            <span className="font-semibold">({board.members.length})</span>:{" "}
          </p>
          <div className="relative flex -space-x-2">
            {board.members.map((member) => (
              <img
                key={member.id}
                src={member.img}
                alt={member.name}
                width={30}
                height={30}
                className="rounded-full border-[1px] bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </MainContainerWithHeader>
  );
}