import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { PiTrashBold } from "react-icons/pi";

export default function CardChecklist({ onAddItem }) {
  const [todoProgress, setTodoProgress] = useState(0);
  const [showItemInput, setShowItemInput] = useState(false);
  const [todoValue, setTodoValue] = useState("");
  const [todos, setTodos] = useState([]);

  const inputAddItemRef = useRef(null);

  function handleClickAddItem() {
    if (todoValue.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: todoValue,
        checked: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
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

  useEffect(() => {
    if (showItemInput && inputAddItemRef) {
      inputAddItemRef.current.focus();
    }
  }, [showItemInput, todoValue]);

  useEffect(() => {
    const totalTodos = todos.length;
    const completedTodos = todos.filter((todo) => todo.checked).length;
    const updatedTodoProgress =
      totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
    setTodoProgress(updatedTodoProgress);
  }, [todos]);

  function handleCheckedItem(item) {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === item.id ? { ...t, checked: !t.checked } : t,
      ),
    );
  }

  useEffect(() => {
    onAddItem(todos);
  }, [onAddItem, todos]);

  return (
    <>
      <div id="cardChecklist" className="flex items-center gap-2">
        <span className="text-xs">{Math.round(todoProgress)}%</span>
        <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className={`duration-400 h-2.5 rounded-full transition-all ease-in-out ${todoProgress === 100 ? `bg-green-500` : `bg-blue-600`}`}
            style={{ width: `${todoProgress}%` }}
          ></div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex flex-col gap-1">
          {todos.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2 basis-[90%]">
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
                    setTodos(todos.filter((t) => t.id !== item.id));
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
                onClick={handleClickAddItem}
                className="gap-2 rounded-md bg-slate-300 px-2 py-1.5 text-sm text-black dark:bg-slate-700 dark:text-drkcol"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowItemInput((prevState) => !prevState)}
                className="text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="mt-3 flex w-fit cursor-pointer items-center gap-2 rounded-md bg-slate-300 px-2 py-1.5 text-sm text-black dark:bg-slate-700 dark:text-drkcol"
            onClick={() => setShowItemInput((prevState) => !prevState)}
          >
            Add an item
          </div>
        )}
      </div>
    </>
  );
}
