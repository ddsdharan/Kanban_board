import { useState } from "react";
import { createPortal } from "react-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useDispatch } from "react-redux";
import {
  updateCardsInList,
  updateLists,
  tempUpdatedLists,
} from "../../../features/boards/boardsSlice";
import List from "./list/List";
import Card from "./list/card/Card";
import { PiFlowerLotusDuotone } from "react-icons/pi";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";

export default function Board() {
  const [activeCard, setActiveCard] = useState(null);
  const [isZenMode, setIsZenMode] = useState(false);
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const board = useSelector((state) =>
    state.boards.find((board) => board.id === parseInt(boardId)),
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 500,
        tolerance: 5,
      },
    }),
  );

  function findList(unique) {
    if (!unique) {
      console.log("not unique");
      return null;
    }

    // Convert `unique` to a string if it's not already
    const uniqueStr = String(unique);

    if (uniqueStr.startsWith("list-")) {
      // Handle the new string-based list IDs
      return board.lists.find((list) => list.id === uniqueStr) ?? null;
    } else {
      // Assume it's a card ID (which are numbers)
      const cardId = Number(unique); // Ensure this is a number
      const listWithId = board.lists.flatMap((list) => {
        const listId = list.id;
        return list.cards.map((i) => ({ itemId: i.id, listId: listId }));
      });

      const listId = listWithId.find((i) => i.itemId === cardId)?.listId;
      return board.lists.find((list) => list.id === listId) ?? null;
    }
  }

  const handleDragStart = (event) => {
    console.log("DRAG START: ", event.active.data.current.cardInfo);
    setActiveCard(event.active.data.current.cardInfo);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    console.log("🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥🟥");

    const activeCardId = active.id; // ID of the card being dragged
    console.log("✅ ACTIVE CARD ID: ", activeCardId);

    // Find the list where the active card belongs
    const activeList = findList(activeCardId);
    console.log("🟢 ACTIVE LIST: ", activeList?.id);

    const overId = over.id; // ID of the element being dragged over

    // Check if we're dragging over a list or card
    let overList;
    if (typeof overId === "string" && overId.startsWith("list-")) {
      // Dragging over a list (empty or not)
      console.log("🔵 DRAGGING OVER LIST ID: ", overId);
      overList = findList(overId);
      console.log("🔵 OVER LIST: ", overList?.id);
    } else {
      // Dragging over a card
      console.log("🟧 DRAGGING OVER CARD ID: ", overId);
      overList = findList(overId); // Get the list that the card belongs to
      console.log("🟠 OVER LIST (from card): ", overList?.id);
    }

    // Previous logic for handling reordering between lists
    if (activeList && overList) {
      console.log("active list:", activeList);
      console.log("over list:", overList);

      // Find the indexes of the active and over cards within their lists
      const activeIndex = activeList.cards.findIndex(
        (card) => card.id === parseInt(activeCardId),
      );
      const overIndex = overList.cards.findIndex(
        (card) => card.id === parseInt(overId),
      );

      console.log("active index", activeIndex);
      console.log("over index", overIndex);

      if (activeList.id !== overList.id) {
        // If the card is being moved to a different list
        const movedCard = activeList.cards[activeIndex];

        // Remove the card from the old list
        const updatedOldCards = [...activeList.cards];
        updatedOldCards.splice(activeIndex, 1);

        // Add the card to the new list
        const updatedNewCards = [...overList.cards];
        if (overIndex >= 0) {
          updatedNewCards.splice(overIndex, 0, movedCard);
        } else {
          // If overIndex is -1 (no cards in the list), add the card to the end
          updatedNewCards.push(movedCard);
        }

        // Dispatch the changes to update the board's state
        dispatch(
          tempUpdatedLists({
            boardId: parseInt(boardId),
            oldListId: activeList.id,
            newListId: overList.id,
            updatedOldCards,
            updatedNewCards,
          }),
        );
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id; // The ID of the dragged card
    const overId = over.id; // The ID of the drop target (could be a card or a list)

    // Find the list where the drag started (active list)
    const activeList = findList(activeId);
    console.log("🟢 ACTIVE LIST (drag start):", activeList?.id);

    let overList;
    if (typeof overId === "string" && overId.startsWith("list-")) {
      // If dropped over a list (even if it's empty)
      overList = findList(overId);
      console.log("🔵 OVER LIST (drop on list):", overList?.id);
    } else {
      // If dropped over a card, find the list the card belongs to
      overList = findList(overId);
      console.log("🟠 OVER LIST (drop on card):", overList?.id);
    }

    // If either the active list or over list is not found, return early
    if (!activeList || !overList) return;

    // Find the indexes of the active and over cards within their lists
    const activeIndex = activeList.cards.findIndex(
      (card) => card.id === parseInt(activeId),
    );
    const overIndex = overList.cards.findIndex(
      (card) => card.id === parseInt(overId),
    );

    // Handle case if the card is moved within the same list
    if (activeList.id === overList.id && activeIndex !== overIndex) {
      // Reorder cards within the same list
      const updatedCards = arrayMove(activeList.cards, activeIndex, overIndex);
      dispatch(
        updateCardsInList({
          boardId: parseInt(boardId),
          listId: activeList.id,
          updatedCards,
        }),
      );
      console.log("✅ Cards reordered in list:", updatedCards);
    } else if (activeList.id !== overList.id) {
      // Handle case if the card is moved to a different list
      const movedCard = activeList.cards[activeIndex];

      // Remove the card from the old list
      const updatedOldCards = [...activeList.cards];
      updatedOldCards.splice(activeIndex, 1);

      // Add the card to the new list
      const updatedNewCards = [...overList.cards];
      if (overIndex >= 0) {
        // Insert the card at the correct position in the new list
        updatedNewCards.splice(overIndex, 0, movedCard);
      } else {
        // If the overIndex is -1 (empty list), add the card to the end
        updatedNewCards.push(movedCard);
      }

      // Dispatch action to update both lists
      dispatch(
        updateLists({
          boardId: parseInt(boardId),
          oldListId: activeList.id,
          newListId: overList.id,
          updatedOldCards,
          updatedNewCards,
        }),
      );
      console.log("✅ Card moved to a different list");
    }

    // Clear the active card after the drag ends
    setActiveCard(null);
  };

  return (
    <div
      id="board"
      className="#181a1f fixed right-0 top-[230px] z-[-1] h-[calc(100%_-_230px)] w-full overflow-x-auto overflow-y-hidden border-l bg-[#f7f7f7] p-5 pt-3 lg:w-[calc(100%_-_25vw)] 2xl:w-[calc(100%_-_20vw)] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol"
    >
      <div className="flex h-[5%] mb-1 items-center gap-2 pl-2">
          {isZenMode ? (
            <PiFlowerLotusDuotone
              className={`text-2xl text-[#365dff] dark:text-[#b0ccff]`}
            />
          ) : (
            <PiFlowerLotusDuotone className="text-2xl" />
          )}
          <button
            className="text-2xl"
            onClick={() => setIsZenMode((prevState) => !prevState)}
          >
            {isZenMode ? (
              <BsToggleOn className="text-[#365dff] dark:text-[#b0ccff]" />
            ) : (
              <BsToggleOff />
            )}
          </button>
        </div>
      <ol className="no-scrollbar grid h-[95%] w-auto grid-flow-col gap-8 overflow-x-auto justify-center align-middle overflow-y-hidden md:auto-cols-[minmax(350px,300px)]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {board &&
            board.lists.map((list) => (
              <List key={list.id} id={list.id} list={list} zen={isZenMode} />
            ))}
          {createPortal(
            <DragOverlay>
              {activeCard && (
                <Card
                  cardId={activeCard.id}
                  cardInfo={activeCard}
                  zen={isZenMode}
                />
              )}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </ol>
    </div>
  );
}