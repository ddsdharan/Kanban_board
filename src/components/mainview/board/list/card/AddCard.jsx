import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addCard } from "../../../../../features/cards/cardsSlice";
import { addBoardCard } from "../../../../../features/boards/boardsSlice";

import {
  PiCardsBold,
  PiFeatherBold,
  PiTagChevronBold,
  PiEyeBold,
  PiEyeSlashBold,
  PiCheckSquareBold,
} from "react-icons/pi";

import CardChecklist from "./CardChecklist";

export default function AddCard({ list, onClose }) {
  const { boardId } = useParams();
  const board = useSelector((state) =>
    state.boards.find((board) => board.id === parseInt(boardId)),
  );
  const cards = useSelector((state) => state.cards);
  const dispatch = useDispatch();

  const formRef = useRef(false);

  const [watching, setWatching] = useState(false);
  const [chars, setChars] = useState(0);
  const [cardTitle, setCardTitle] = useState("");
  const [cardDesc, setCardDesc] = useState("");
  const [categoryName, setCategoryName] = useState("UX/UI");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [checklistItems, setChecklistItems] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const createdDate = new Date().toISOString().split("T")[0];

  function toggleMemberSelection(memberId) {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId],
    );
  }
  const selectedMemberDetails = board.members.filter((member) =>
    selectedMembers.includes(member.id),
  );

  function updateChecklist(fullList) {
    setChecklistItems(fullList);
  }

  const maxChars = 150;

  function handleChangeChars(e) {
    let typedCharsLength = e.target.value.length;
    if (typedCharsLength <= maxChars) {
      setChars(typedCharsLength);
    } else {
      setChars(maxChars);
      e.target.value = e.target.value.substring(0, maxChars);
    }
    setCardDesc(e.target.value);
  }

  useEffect(() => {
    console.log("UP TO DATE CARDS:", cards);
    console.log("UP TO DATE BOARD:", board);
  }, [cards, board]);

  function generateUniqueId(existingIds) {
    let newId;
    do {
      newId = Math.floor(10000 + Math.random() * 90000);
    } while (existingIds.includes(newId));
    return newId;
  }

  function handleAddCardSubmit(event) {
    event.preventDefault();
    const existingCardIds = cards.map((card) => card.id);
    const uniqueId = generateUniqueId(existingCardIds);
    const cardInfo = {
      id: uniqueId,
      category: categoryName,
      title: cardTitle,
      description: cardDesc,
      checklist: checklistItems,
      members: selectedMemberDetails,
      watching: watching,
      watchers: 5,
      comments: 2,
      files: 3,
      createdDate: createdDate,
      dueDate: dueDate,
    };
    dispatch(addCard(cardInfo));
    dispatch(
      addBoardCard({
        boardId: parseInt(boardId),
        listId: list.id,
        cardInfo: cardInfo,
      }),
    );

    formRef.current.reset();
    onClose();

    console.log(`ADD BOARD CARD`);
    console.log(`BOARD: `, board);
    console.log(`LIST: `, list);
    console.log(`CARD: `, cards);
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 px-4 pt-0 pb-0">
        <form onSubmit={handleAddCardSubmit} ref={formRef}>
          <div className="space-y-12">
            <div>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex items-center gap-4">
                    <h2 className="text-lg font-semibold leading-7">
                      Add a new task
                    </h2>
                    <div
                      className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-300 px-2 py-1.5 text-black dark:bg-slate-700 dark:text-drkcol"
                      onClick={() => setWatching((prev) => !prev)}
                    >
                      {watching ? (
                        <>
                          <PiEyeBold />
                          <p className="text-sm">Watching</p>
                        </>
                      ) : (
                        <>
                          <PiEyeSlashBold />
                          <p className="text-sm">Watch</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <p>In list: </p>
                    <div className="flex items-center gap-1">
                      <span
                        style={{ backgroundColor: list.color }}
                        className="inline-block h-[10px] w-[10px] rounded-full"
                      ></span>
                      <p className="font-medium">{list.name}</p>
                    </div>
                  </div>
                </div>
                <div id="members-section">
                  <p className="mb-1 text-sm">
                    Select members for this card:{" "}
                    <span className="font-semibold">
                      {selectedMemberDetails.length}
                    </span>
                  </p>
                  <div className="relative flex gap-2">
                    {board.members.map((member) => (
                      <img
                        key={member.id}
                        src={member.img}
                        alt={member.name}
                        width={35}
                        height={35}
                        title={member.name}
                        className={`cursor-pointer bg-white ${selectedMembers.includes(member.id) ? `rounded-full grayscale-0` : `grayscale`} ${!selectedMembers.includes(member.id) && `rounded-md`}`}
                        onClick={() => toggleMemberSelection(member.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <div className="flex items-center gap-2">
                    <PiCardsBold className="text-xl" />
                    <label
                      htmlFor="card-title"
                      className="block text-sm font-medium leading-6"
                    >
                      Title
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="card-title"
                      name="card-title"
                      type="text"
                      placeholder="Add the name of the task here"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-drkbg"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <div className="flex items-center gap-2">
                    <PiFeatherBold className="text-xl" />
                    <label
                      htmlFor="card-description"
                      className="block text-sm font-medium leading-6"
                    >
                      Description
                    </label>
                    <span
                      className={`text-xs ${chars >= 140 && "text-red-500"} ${chars < 140 && "text-black dark:text-white"}`}
                    >
                      {chars}/{maxChars}
                    </span>
                  </div>
                  <div className="mt-2">
                    <textarea
                      id="card-description"
                      name="card-description"
                      type="text"
                      placeholder="Add a short description"
                      rows="3"
                      value={cardDesc}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-drkbg"
                      onChange={handleChangeChars}
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <div className="flex items-center gap-2">
                    <PiTagChevronBold className="text-xl" />
                    <label
                      htmlFor="card-category"
                      className="block text-sm font-medium leading-6"
                    >
                      Select Category
                    </label>
                  </div>

                  <div className="mt-2">
                    <select
                      id="card-category"
                      name="card-category"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:text-drkbg2"
                    >
                      <option>UX/UI</option>
                      <option>Design</option>
                      <option>Branding</option>
                      <option>Marketing</option>
                      <option>Testing</option>
                    </select>
                  </div>
                </div>


                <div className="sm:col-span-2">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="due-date"
                      className="block text-sm font-medium leading-6"
                    >
                      Due Date
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="due-date"
                      name="due-date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-drkbg"
                    />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <div className="mb-1 flex items-center gap-2">
                    <PiCheckSquareBold className="text-xl" />
                    <label
                      htmlFor="card-checklist"
                      className="block text-sm font-medium leading-6"
                    >
                      Checklist
                    </label>
                  </div>
                  <CardChecklist onAddItem={updateChecklist} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="cursor-pointer text-sm font-semibold leading-6"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !cardTitle.trim() ||
                !cardDesc.trim() ||
                !categoryName.trim()
              }
              className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${cardTitle.trim() && cardDesc.trim() && categoryName.trim() ? "bg-[#365dff] text-white" : "bg-gray-400 text-white"}`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
