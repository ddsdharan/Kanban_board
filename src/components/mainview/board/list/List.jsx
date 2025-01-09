import ListTitle from "./list-title/ListTitle";
import AddTaskBtn from "./add-task/AddTaskBtn";
import Card from "./card/Card";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { useMemo } from "react";

export default function List({ list, id, zen }) {
  const { setNodeRef } = useDroppable({ id: id });
  const cardIds = useMemo(() => {
    return list.cards.map((card) => card.id)
  }, [list.cards])

  return (
    <SortableContext id={id} items={cardIds} strategy={rectSortingStrategy}>
      <li ref={setNodeRef} className="no-scrollbar flex h-[100%] w-[300px] flex-col items-center gap-5 overflow-y-auto rounded-lg border p-5 md:w-[350px] dark:border-drkbrd dark:bg-drkbg2">
        <div className="sticky flex flex-col gap-3 rounded-lg bg-[#f7f7f7] dark:bg-drkbg2 dark:text-drkcol">
          <ListTitle
            title={list.name}
            listColor={list.color}
            numCards={list.cards.length}
          />
          <AddTaskBtn list={list} />
        </div>
        <div className="no-scrollbar h-[100%] overflow-auto rounded-lg">
          <div className="relative top-[0px] flex flex-col gap-3">
            {list.cards.length === 0 ? (
              <p className="text-sm">Currently no cards</p>
            ) : null}
            {list.cards.slice().reverse().map((card) => (
              <Card
                key={card.id}
                cardId={card.id}
                cardInfo={card}
                list={list}
                zen={zen}
              />
            ))}
          </div>
        </div>
      </li>
    </SortableContext>
  );
}