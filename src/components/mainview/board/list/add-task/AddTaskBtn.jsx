import { useState } from "react";
import Modal from "../../../../ui-components/Modal";
import AddCard from "../card/AddCard";

import { PiPlusBold } from "react-icons/pi";

export default function AddTaskBtn({list}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className="flex w-[250px] items-center justify-center rounded-lg border bg-white p-4 font-medium text-[#365dff] transition-all ease-in-out hover:bg-[#365dff] hover:text-white md:w-[300px] dark:border-drkbrd dark:bg-drkbg dark:text-drkcol duration-400"
        onClick={() => setIsOpen(true)}
      >
        <PiPlusBold />
        <p className="text-sm md:text-base">&nbsp;Add New Task</p>
      </button>
      {isOpen ? (
        <Modal closeModal={() => setIsOpen(false)}>
          <AddCard list={list} onClose={() => setIsOpen(false)} />
        </Modal>
      ) : null}
    </>
  );
}