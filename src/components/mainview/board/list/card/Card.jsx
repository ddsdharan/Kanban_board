import { useEffect, useState,  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DropMenu from "../../../../ui-components/DropMenu";
import MemberCircles from "../../../../ui-components/MemberCircles";
import Modal from "../../../../ui-components/Modal";
import EditCard from "./EditCard";
import categories from "../../../../../data/categories";
import { deleteCard } from "../../../../../features/cards/cardsSlice";
import { deleteBoardCard } from "../../../../../features/boards/boardsSlice";
import {
  PiDotsThreeOutlineVerticalFill,
  PiNotePencilBold,
  PiTrashBold,
  PiListChecksBold,
  PiEyeBold,
  PiChatCircleDotsBold,
  PiPaperclipBold,
} from "react-icons/pi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ cardInfo, cardId, zen, list }) {

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: cardId,
    data: {
      type: "card",
      cardInfo,
    }
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [isOpen, setIsOpen] = useState(false);
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  useEffect(() => {
    console.log(boards);
  }, [boards]);

  const card = useSelector((state) =>
    state.cards.find((card) => card.id === cardId),
  );

  const completedCount = card.checklist
    ? card.checklist.filter((item) => item.checked).length
    : "";
  const totalCount = card.checklist ? card.checklist.length : "";
  const allCompleted = card.checklist && completedCount === totalCount;

  if (!card) {
    return null;
  }

  const cardCategory = categories.find(
    (category) => category.name === card.category,
  );

  function handleDeleteCard(cardId) {
    dispatch(deleteCard(cardId));
    dispatch(deleteBoardCard({ boardId: parseInt(boardId), cardId }));
  }

  const handleCardClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isDragging && (
        <div
          className={`flex w-[240px] cursor-pointer flex-col rounded-lg border-2 border-dashed border-blue-600 bg-white opacity-30 hover:ring-blue-600 md:w-[300px] dark:border-2 dark:border-dashed dark:border-lime-400 dark:bg-drkbg dark:text-drkcol touch-none`}
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        >
          <div
            className={`flex flex-col gap-4 ${!zen ? `h-[230px] justify-evenly border-b border-b-drkbrd` : ``} p-4`}
          >
            <div className="flex items-center justify-between">
              {cardCategory && (
                <>
                  <span
                    className={`hidden rounded-full text-xs font-medium dark:inline ${!zen ? `px-3 py-1 md:text-[12px]` : `md:text-[12px]`}`}
                    style={
                      !zen
                        ? {
                            backgroundColor: cardCategory.drkBgcolor,
                            color: cardCategory.drkColor,
                          }
                        : {
                            backgroundColor: `transparent`,
                            color: cardCategory.textColor,
                          }
                    }
                  >
                    {cardCategory.name}
                  </span>
                  <span
                    className={`rounded-full text-xs font-medium dark:hidden ${!zen ? `px-3 py-1 md:text-[12px]` : `md:text-[12px]`}`}
                    style={
                      !zen
                        ? {
                            backgroundColor: cardCategory.bgColor,
                            color: cardCategory.textColor,
                          }
                        : {
                            backgroundColor: `transparent`,
                            color: cardCategory.textColor,
                          }
                    }
                  >
                    {cardCategory.name}
                  </span>
                </>
              )}
              <DropMenu
                trigger={
                  <PiDotsThreeOutlineVerticalFill className="cursor-pointer" />
                }
                pos={`right-[0px]`}
              >
                <nav className="flex flex-col items-start gap-2 text-sm">
                  <button onClick={() => setIsOpen(true)}>Edit</button>
                  <button onClick={() => handleDeleteCard(card.id)}>
                    Delete
                  </button>
                </nav>
              </DropMenu>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <p className={`font-medium ${zen ? `text-sm` : ``}`}>
                  {card.title} - {card.id}
                </p>
                <div>{card.watching && !zen ? <PiEyeBold /> : null}</div>
              </div>
              {!zen ? (
                <p className="text-xs text-[#8f959f] dark:text-drkcol">
                  {card.description}
                </p>
              ) : null}
              <div
                className={`flex w-fit items-center gap-2.5 rounded-lg dark:border-drkbrd ${!zen ? `border bg-white p-1.5 dark:bg-drkbg2` : ``} ${allCompleted && totalCount !== 0 && !zen ? `border-green-600 bg-[#e6efea] dark:border-0 dark:bg-green-600` : null}`}
              >
                <PiListChecksBold
                  className={`text-[#a4a6a8] dark:text-drkcol ${allCompleted && totalCount !== 0 && `text-green-600 dark:text-green-200`}`}
                />
                <p
                  className={`${allCompleted && totalCount !== 0 && `text-green-600 dark:text-green-200`} text-sm text-[#a4a6a8] dark:text-drkcol`}
                >
                  {`${completedCount}/${totalCount}`}
                </p>
              </div>
            </div>
          </div>
          {!zen ? (
            <div className="flex items-center justify-between p-4">
              <div className="relative flex w-fit">
                <MemberCircles imgs={card.members} size={25} />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 text-[#a4a6a8] dark:text-drkcol">
                  <PiEyeBold className="" />
                  <p className="text-sm">{card.watchers}</p>
                </div>
                <div className="flex items-center gap-1 text-[#a4a6a8] dark:text-drkcol">
                  <PiChatCircleDotsBold className="" />
                  <p className="text-sm">{card.comments}</p>
                </div>
                <div className="flex items-center gap-1 text-[#a4a6a8] dark:text-drkcol">
                  <PiPaperclipBold className="" />
                  <p className="text-sm">{card.files}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
      {!isDragging && (
        <div
          className={`duration-400 flex w-[240px] cursor-pointer flex-col rounded-lg border bg-white transition-all ease-in-out hover:ring-2 hover:ring-inset hover:ring-blue-600 md:w-[300px] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol touch-none`}
          onClick={handleCardClick}
          style={style}
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        >
          <div
            className={`flex flex-col gap-4 ${!zen ? `h-[230px] justify-evenly border-b border-b-drkbrd` : ``} p-4`}
          >
            <div className="flex items-center justify-between">
              {cardCategory && (
                <>
                  <span
                    className={`hidden rounded-full text-xs font-medium dark:inline ${!zen ? `px-3 py-1 md:text-[12px]` : `md:text-[12px]`}`}
                    style={
                      !zen
                        ? {
                            backgroundColor: cardCategory.drkBgcolor,
                            color: cardCategory.drkColor,
                          }
                        : {
                            backgroundColor: `transparent`,
                            color: cardCategory.textColor,
                          }
                    }
                  >
                    {cardCategory.name}
                  </span>
                  <span
                    className={`rounded-full text-xs font-medium dark:hidden ${!zen ? `px-3 py-1 md:text-[12px]` : `md:text-[12px]`}`}
                    style={
                      !zen
                        ? {
                            backgroundColor: cardCategory.bgColor,
                            color: cardCategory.textColor,
                          }
                        : {
                            backgroundColor: `transparent`,
                            color: cardCategory.textColor,
                          }
                    }
                  >
                    {cardCategory.name}
                  </span>
                </>
              )}
              <DropMenu
                trigger={
                  <div className="relative cursor-pointer rounded-full bg-transparent p-2 hover:bg-hvrcol dark:text-drkcol dark:hover:bg-drkhvrcol">
                    <PiDotsThreeOutlineVerticalFill />
                  </div>
                }
                pos={`right-[0px]`}
              >
                <nav className="flex flex-col items-start gap-1 text-sm">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="relative flex cursor-pointer items-center gap-x-2 rounded-md bg-transparent w-full"
                  >
                    <PiNotePencilBold />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="relative flex cursor-pointer items-center gap-x-2 rounded-md bg-transparent w-full"
                  >
                    <PiTrashBold />
                    <span>Delete</span>
                  </button>
                </nav>
              </DropMenu>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <p className={`font-medium ${zen ? `text-sm` : ``}`}>
                  {card.title}
                </p>
                <div>{card.watching && !zen ? <PiEyeBold /> : null}</div>
              </div>
              {!zen ? (
                <p className="text-xs text-[#8f959f] dark:text-drkcol">
                  {card.description}
                </p>
              ) : null}
              <div
                className={`flex w-fit items-center gap-2.5 rounded-lg dark:border-drkbrd ${!zen ? `border bg-white p-1.5 dark:bg-drkbg2` : ``} ${allCompleted && totalCount !== 0 && !zen ? `border-green-600 bg-green-100 dark:border-0 dark:bg-green-600` : null}`}
              >
                <PiListChecksBold
                  className={`text-[#a4a6a8] dark:text-drkcol ${allCompleted && totalCount !== 0 && `text-green-600 dark:text-green-200`}`}
                />
                <p
                  className={`${allCompleted && totalCount !== 0 && `text-green-600 dark:text-green-200`} text-sm text-[#a4a6a8] dark:text-drkcol`}
                >
                  {`${completedCount}/${totalCount}`}
                </p>
              </div>
            </div>
          </div>
          {!zen ? (
            <div className="flex items-center justify-between p-4">
              <div className="relative flex w-fit">
                <MemberCircles imgs={card.members} size={25} />
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1 text-[#a4a6a8] dark:text-drkcol">
                  <PiEyeBold className="" />
                  <p className="text-sm">{card.watchers}</p>
                </div>
                <div className="flex items-center gap-1 text-[#a4a6a8] dark:text-drkcol">
                  <PiChatCircleDotsBold className="" />
                  <p className="text-sm">{card.comments}</p>
                </div>
                <div className="flex items-center gap-1 text-[#a4a6a8] dark:text-drkcol">
                  <PiPaperclipBold className="" />
                  <p className="text-sm">{card.files}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
      {isOpen ? (
        <Modal closeModal={() => setIsOpen(false)}>
          <EditCard
            list={list}
            cardId={cardId}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      ) : null}
    </>
  );
}