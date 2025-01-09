import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addMember } from "../../../features/members/membersSlice";
import { addBoardMember } from "../../../features/boards/boardsSlice";

import Modal from "../../ui-components/Modal";
import MemberCircles from "../../ui-components/MemberCircles";

import {
  PiPlusBold,
  PiCameraBold,
  PiUserPlusBold,
  PiUserCirclePlusBold,
  PiUserFocusBold,
} from "react-icons/pi";

export default function MainViewMembers() {

  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector((state) =>
    state.boards.find((board) => board.id === parseInt(boardId)),
  );

  const members = board ? board.members : [];
  
  const [memberName, setMemberName] = useState("");
  const [memberImg, setMemberImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const memberImgUpload = useRef(null);
  const memberImgFrame = useRef(null);
  const formRef = useRef(null);

  function handleImgChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files[0]) {
      reader.onload = function (e) {
        setMemberImg(e.target.result);
        memberImgFrame.current.src = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  function handleMemberName(event) {
    setMemberName(event.target.value);
  }

  function handleClickCancelBtn() {
    formRef.current.reset();
    setMemberImg(null);
    setMemberName("");
    setIsOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const memberInfo = {
      id: uuidv4(),
      name: memberName,
      img: memberImg,
    };
    
    dispatch(addMember(memberInfo));
    dispatch(addBoardMember({ id: parseInt(boardId), newMember: memberInfo }));
   
    handleClickCancelBtn();
    
  }

  return (
    <div className="col-start-2 col-end-3 row-start-1 row-end-2 flex items-center gap-3 justify-self-end">
      <div className="hidden md:block">
        <div className="relative flex w-fit">
          <MemberCircles imgs={members} size={35} side={`right`} />
        </div>
      </div>
      <div>
        <>
          <button
            className="btn-transition flex cursor-pointer items-center whitespace-nowrap rounded-md bg-[#365dff] p-3 text-sm font-normal text-white hover:bg-[#1c49ff]"
            onClick={() => setIsOpen(true)}
          >
            <div className="hidden items-center md:flex">
              <PiPlusBold />
              <p>&nbsp;Add Member</p>
            </div>
            <PiUserPlusBold className="text-xl md:hidden" />
          </button>
          {isOpen ? (
            <Modal closeModal={() => setIsOpen(false)}>
              <form
                ref={formRef}
                className="flex h-[100%] flex-col justify-between gap-5"
                onSubmit={handleSubmit}
              >
                <div className="space-y-12">
                  <div className="">
                    <div className="flex gap-4">
                      <h2 className="text-lg font-semibold leading-7">
                        Add a new member
                      </h2>
                    </div>
                    <div
                      className="mt-4 flex basis-1/3 cursor-pointer flex-col items-center justify-center gap-2"
                      onClick={() => memberImgUpload.current.click()}
                    >
                      <div
                        ref={memberImgFrame}
                        className={`borderd-[1px] flex h-[100px] w-[100px] items-center justify-center rounded-full ${!memberImg ? "border-[#365dff]" : null} bg-blue-100`}
                      >
                        {memberImg ? (
                          <img
                            src={memberImg}
                            alt="Profile Picture"
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          <PiCameraBold className="text-2xl text-blue-950" />
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-center font-semibold dark:text-white">
                      {memberName}
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-full">
                        <div className="flex items-center gap-2">
                          <PiUserCirclePlusBold className="text-xl" />
                          <label
                            htmlFor="member-name"
                            className="block text-sm font-medium leading-6"
                          >
                            Full name
                          </label>
                        </div>
                        <div className="mt-2">
                          <input
                            onChange={handleMemberName}
                            id="member-name"
                            name="member-name"
                            type="text"
                            placeholder="John Smith..."
                            value={memberName}
                            className="block w-full rounded-md border-0 py-1.5 text-sm shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 dark:text-drkbg"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-full">
                        <div className="flex items-center gap-2">
                          <PiUserFocusBold className="text-xl" />
                          <label
                            htmlFor="member-img"
                            className="block text-sm font-medium leading-6"
                          >
                            Profile pic
                          </label>
                        </div>
                        <div className="mt-2 w-[50px]">
                          <input
                            type="file"
                            name="fileInput"
                            id="fileInput"
                            ref={memberImgUpload}
                            onChange={handleImgChange}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-end gap-6">
                  <button
                    type="button"
                    className="text-sm font-semibold"
                    onClick={handleClickCancelBtn}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!memberName || !memberImg}
                    className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${memberName && memberImg ? "bg-[#365dff] text-white" : "bg-gray-400 text-white"}`}
                  >
                    Add Member
                  </button>
                </div>
              </form>
            </Modal>
          ) : null}
        </>
      </div>
    </div>
  );
}
