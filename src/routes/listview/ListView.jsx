import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import MainContainerWithHeader from "../../components/ui-components/MainContainerWithHeader";
import ListViewRow from "./ListViewRow";
import {
  PiArrowCircleRightBold,
  PiCardsBold,
  PiTagChevronBold,
  PiCheckCircleBold,
  PiUsersBold,
  PiGearFineBold,
  PiSmileySadBold,
} from "react-icons/pi";
import categories from "../../data/categories";

export default function ListView() {
  const { boardId } = useParams();
  const board = useSelector((state) =>
    state.boards.find((board) => board.id === parseInt(boardId)),
  );

  const cardsData = board.lists.flatMap((list) =>
    list.cards.map((card) => {
      const cardCategory = categories.find(
        (category) => category.name === card.category,
      );
      const cardMembers = card.members || [];
      return {
        listName: list.name,
        listColour: list.color,
        cardTitle: card.title,
        cardCategory: cardCategory || {},
        cardChecklist: card.checklist,
        cardMembers: cardMembers,
        cardId: card.id,
      };
    }),
  );

  const tableHeaders = [
    {
      id: 1,
      name: "Status",
      icon: <PiArrowCircleRightBold />,
    },
    {
      id: 2,
      name: "Title",
      icon: <PiCardsBold />,
    },
    {
      id: 3,
      name: "Category",
      icon: <PiTagChevronBold />,
    },
    {
      id: 4,
      name: "Tasks",
      icon: <PiCheckCircleBold />,
    },
    {
      id: 5,
      name: "Members",
      icon: <PiUsersBold />,
    },
    {
      id: 6,
      name: "Options",
      icon: <PiGearFineBold />,
    },
  ];

  return (
    <MainContainerWithHeader>
      {cardsData.length !== 0 ? (
        <div className="relative overflow-x-auto rounded-lg border-x border-b-0 border-t dark:border-drkbrd">
          <table className="w-full text-left text-sm rtl:text-right">
            <thead className="bg-[#f0f0f0] dark:bg-drkbg2">
              <tr>
                <th scope="col" className="p-4"></th>
                {tableHeaders.map((item) => (
                  <th key={item.id} scope="col" className="px-5 py-3">
                    <div className="text-md flex items-center gap-1.5">
                      <div className="text-lg">{item.icon}</div>
                      <p className="text-sm font-medium">{item.name}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cardsData.map((card) => (
                  <ListViewRow
                    key={card.cardId}
                    status={card.listName}
                    title={card.cardTitle}
                    category={card.cardCategory}
                    tasks={card.cardChecklist}
                    members={card.cardMembers}
                    id={card.cardId}
                  />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <PiSmileySadBold className="text-3xl text-[#365dff] dark:text-drkcol" />
          <p className="text-xl">No tasks</p>
          <p className="text-center">
            There are currently no tasks, head back to the{" "}
            <Link
              to={`/project/${boardId}/tasks`}
              className="font-semibold underline"
            >
              board view
            </Link>{" "}
            to add some tasks! Then return here to see the list view.
          </p>
        </div>
      )}
    </MainContainerWithHeader>
  );
}
