import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../ui-components/Modal";
import EditCard from "../mainview/board/list/card/EditCard";

export default function SearchResults({ search, setSearch, searchInputRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedList, setSelectedList] = useState(null);
  const boards = useSelector((state) => state.boards);
  const cards = useSelector((state) => state.cards);
  const searchRef = useRef(null);

  const findBoardByCardId = (cardId) => {
    return boards.find((board) =>
      board.lists.some((list) => list.cards.some((card) => card.id === cardId)),
    );
  };

  const findListByCardId = (cardId) => {
    const board = findBoardByCardId(cardId);
    return board
      ? board.lists.find((list) =>
          list.cards.some((card) => card.id === cardId),
        )
      : null;
  };

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase()),
  );

  const showResults = search && filteredCards.length > 0;

  function handleCardClick(cardId) {
    setSearch("");
    setSelectedCardId(cardId);
    setSelectedList(findListByCardId(cardId));
    setIsOpen(true);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setSearch("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef, searchInputRef, setSearch]);

  return (
    <>
      {showResults && (
        <div
          ref={searchRef}
          className="flex h-auto max-h-[300px] flex-col items-start overflow-y-auto rounded-b-md"
        >
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => {
              const board = findBoardByCardId(card.id);
              return (
                board && (
                  <Link
                    key={card.id}
                    to={`/project/${board.id}/tasks`}
                    onClick={() => handleCardClick(card.id)}
                    className="w-full"
                  >
                    <div className="flex w-[100%] cursor-pointer items-center gap-2 overflow-hidden border-t border-t-[#e5e7eb] p-4 hover:bg-[#c6c8cb] dark:border-t dark:border-t-[rgba(136,136,136,0.3)] dark:hover:bg-slate-900 z-[1000]">
                      <div
                        className={`col-start-1 col-end-2 row-start-1 row-end-2 flex h-[30px] w-[30px] items-center justify-center`}
                      >
                        <img
                          src={board.img}
                          alt={board.name}
                          className="h-full w-full rounded-md object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{card.title}</p>
                        <p className="text-xs font-normal">{board.name}</p>
                      </div>
                    </div>
                  </Link>
                )
              );
            })
          ) : (
            <div>No results found</div>
          )}
        </div>
      )}
      {isOpen && (
        <Modal closeModal={() => setIsOpen(false)}>
          <EditCard
            list={selectedList}
            cardId={selectedCardId}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </>
  );
}
