  import { useState, useRef, useEffect } from "react";
  import { v4 as uuidv4 } from "uuid";
  import { useSelector, useDispatch } from "react-redux";
  import { useParams } from "react-router-dom";
  import { editCard } from "../../../../../features/cards/cardsSlice";
  import { editBoardCard } from "../../../../../features/boards/boardsSlice";

  import {PiTrashBold} from "react-icons/pi";

  import {
    PiEyeBold,
    PiEyeSlashBold,
    PiCardsBold,
    PiFeatherBold,
    PiTagChevronBold,
    PiCheckSquareBold,
  } from "react-icons/pi";

  export default function EditCard({list, cardId, onClose}) {
    const { boardId } = useParams();
    const board = useSelector((state) =>
      state.boards.find((board) => board.id === parseInt(boardId)),
    );

    const card = list.cards.find((card) => card.id === cardId);

    const dispatch = useDispatch();
    const formRef = useRef(null);

    const [watchingState, setWatchingState] = useState(card.watching || false);
    const [selectedMembers, setSelectedMembers] = useState(
      card.members.map((member) => member.id),
    );
    const [cardTitle, setCardTitle] = useState(card.title);
    const [cardDesc, setCardDesc] = useState(card.description);
    const [cardCat, setCardCat] = useState(card.category);
    const [checklistItems, setChecklistItems] = useState(card.checklist || []);

    const [todoProgress, setTodoProgress] = useState(0);
    const [showItemInput, setShowItemInput] = useState(false);
    const [todoValue, setTodoValue] = useState("");
    const [dueDate, setDueDate] = useState(card.dueDate || "");
    const createdDate = new Date().toISOString().split("T")[0];
    const inputAddItemRef = useRef(null);

    useEffect(() => {
      setSelectedMembers(card.members.map((member) => member.id));
      console.log(card);
    }, [card]);

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

    function handleEditCardSubmit(event) {
      event.preventDefault();
      const updatedCardInfo = {
        category: cardCat,
        title: cardTitle,
        description: cardDesc,
        checklist: checklistItems,
        members: selectedMemberDetails,
        watching: watchingState,
        createdDate: createdDate,
        dueDate: dueDate,

      };
      dispatch(editCard({ cardId: card.id, newInfo: updatedCardInfo  }));
      dispatch(editBoardCard({ boardId: parseInt(boardId), cardId: card.id, newInfo: updatedCardInfo }));
      onClose();
    }


      useEffect(() => {
        const totalTodos = checklistItems.length;
        const completedTodos = checklistItems.filter(
          (todo) => todo.checked,
        ).length;
        const updatedTodoProgress =
          totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
        setTodoProgress(updatedTodoProgress);
      }, [checklistItems]);

      function handleCheckedItem(item) {
        setChecklistItems((prevTodos) =>
          prevTodos.map((t) =>
            t.id === item.id ? { ...t, checked: !t.checked } : t,
          ),
        );
      }
    
      function handleClickAddItem() {
        if (todoValue.trim() !== "") {
          const newTodo = {
            id: uuidv4(),
            text: todoValue,
            checked: false,
          };
          setChecklistItems((prevTodos) => [...prevTodos, newTodo]);
          setTodoValue("");
          setShowItemInput(true);
        }
      }

      function handleKeyPress(event) {
        if (event.key === "Enter") {
          event.preventDefault();
          handleClickAddItem();
        }
      }

    return (
      <div className="flex flex-col">
        <div className="flex-1 px-4 pb-0 pt-0">
          <form onSubmit={handleEditCardSubmit} ref={formRef}>
            <div className="space-y-12">
              <div>
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="flex w-[95%] items-center gap-4">
                      <h2 className="text-lg font-semibold leading-7">
                        Edit Task - {card.title}
                      </h2>
                      <div
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-300 px-2 py-1.5 text-black dark:bg-slate-700 dark:text-drkcol"
                        onClick={() => setWatchingState((prev) => !prev)}
                      >
                        {watchingState ? (
                          <>
                            <PiEyeBold />
                            <p className="hidden text-sm sm:block">Watching</p>
                          </>
                        ) : (
                          <>
                            <PiEyeSlashBold />
                            <p className="hidden text-sm sm:block">Watch</p>
                            </>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Created: 
                        </p>
                        <span className="text-sm font-semibold text-black dark:text-white">
                          {createdDate}
                          </span>
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
                      Active members:{" "}
                      <span className="font-semibold">
                        {selectedMembers.length}
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
                          className={`cursor-pointer bg-white object-cover ${selectedMembers.includes(member.id) ? `rounded-full grayscale-0` : `grayscale`} ${!selectedMembers.includes(member.id) && `rounded-md`}`}
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
                      <span className="false text-xs text-black dark:text-white">
                        {card.description.length}/150
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
                        onChange={(e) => setCardDesc(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-drkbg"
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
                        value={cardCat}
                        onChange={(e) => setCardCat(e.target.value)}
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
                    <>
                      <div id="cardChecklist" className="flex items-center gap-2">
                        <span className="text-xs">
                          {Math.round(todoProgress)}%
                        </span>
                        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className={`duration-400 h-2.5 rounded-full transition-all ease-in-out ${todoProgress === 100 ? `bg-green-500` : `bg-blue-600`}`}
                            style={{ width: `${todoProgress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="flex flex-col gap-1">
                          {checklistItems.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between"
                            >
                              <div className="flex basis-[90%] items-center gap-2">
                                <label
                                  htmlFor={`task-${item.id}`}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={`task-${item.id}`}
                                    onChange={() => {
                                      handleCheckedItem(item);
                                    }}
                                    checked={item.checked}
                                  />
                                  <p
                                    className={`text-sm ${item.checked ? `line-through` : null}`}
                                  >
                                    {item.text}
                                  </p>
                                </label>
                              </div>
                              <div className="flex-shrink-0 basis-[5%]">
                                <PiTrashBold
                                  className="cursor-pointer"
                                  onClick={() => {
                                    setChecklistItems(
                                      checklistItems.filter(
                                        (t) => t.id !== item.id,
                                      ),
                                    );
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        {showItemInput ? (
                          <div className="mt-3 flex flex-col gap-3">
                            <input
                              type="text"
                              value={todoValue}
                              onChange={(e) => setTodoValue(e.target.value)}
                              ref={inputAddItemRef}
                              onKeyDown={handleKeyPress}
                              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:text-drkbg"
                            />
                            <div className="flex gap-3">
                              <button
                                type="button"
                                className="gap-2 rounded-md bg-slate-300 px-2 py-1.5 text-sm text-black dark:bg-slate-700 dark:text-drkcol"
                                onClick={handleClickAddItem}
                              >
                                Add
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setShowItemInput((prevState) => !prevState)
                                }
                                className="text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-300 px-2 py-1.5 text-sm text-black dark:bg-slate-700 dark:text-drkcol"
                            onClick={() =>
                              setShowItemInput((prevState) => !prevState)
                            }
                          >
                            Add an item
                          </div>
                        )}
                      </div>
                    </>
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
                disabled={false}
                className={`cursor-pointer rounded-md bg-[#365dff] px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
