import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addNote, deleteNote } from "../../features/notes/notesSlice";
import {
  addBoardNote,
  addReactionToNote,
  deleteBoardNote,
} from "../../features/boards/boardsSlice";
import Note from "./Note";
import MainContainerWithHeader from "../../components/ui-components/MainContainerWithHeader";
import { PiPaperPlaneRightBold } from "react-icons/pi";

export default function Notes() {
  const [noteText, setNoteText] = useState("");

  const dispatch = useDispatch();
  const { boardId } = useParams();
  const board = useSelector((state) =>
    state.boards.find((board) => board.id === parseInt(boardId)),
  );
  const notes = board ? board.notes : [];

  function handleKeyPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNoteSubmit(e);
    }
  }

  function handleNoteSubmit(e) {
    e.preventDefault();
    setNoteText("");
    const noteInfo = {
      id: uuidv4(),
      text: noteText,
      reactions: [],
      timestamp: new Date().toISOString(),
    };

    if (noteText.trim().length !== 0) {
      dispatch(addNote(noteInfo));
      dispatch(addBoardNote({ id: parseInt(boardId), newNote: noteInfo }));
    }
  }

  function handleAddReaction(noteId, emoji) {
    dispatch(addReactionToNote({ boardId: parseInt(boardId), noteId, emoji }));
  }

  function handleNoteDelete(noteId) {
    dispatch(deleteNote(noteId));
    dispatch(deleteBoardNote({ boardId: parseInt(boardId), noteId }));
  }

  return (
    <MainContainerWithHeader>
      <p className="text-md mb-5 h-[5%] font-medium">{board.name} notes</p>
      <div id="container" className="flex h-[90%] flex-col justify-between">
        <div className="no-scrollbar mb-5 flex h-full flex-col-reverse gap-3 overflow-scroll rounded-md border dark:border-drkbrd py-3">
          {notes
            .slice()
            .reverse()
            .map((note) => (
              <Note
                key={note.id}
                id={note.id}
                text={note.text}
                emojis={note.reactions}
                timestamp={note.timestamp}
                onAddReaction={handleAddReaction}
                handleNoteDelete={() => handleNoteDelete(note.id)}
              />
            ))}
        </div>
        <form className="flex items-end gap-3" onSubmit={handleNoteSubmit}>
          <textarea
            rows={4}
            id="add-note"
            name="add-note"
            type="text"
            placeholder="Add note..."
            value={noteText}
            className="block w-[100%] basis-[95%] rounded-md shadow-sm ring-1 ring-inset ring-neutral-400 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 dark:border-drkbrd dark:bg-drkbg dark:text-drkcol"
            onChange={(e) => setNoteText(e.target.value)}
            onKeyDown={handleKeyPress}
          ></textarea>
          <button
            className={`${
              noteText.trim() !== "" ? `bg-[#365dff]` : `bg-gray-400`
            } btn-transition flex h-[40px] basis-auto cursor-pointer items-center whitespace-nowrap rounded-md px-3 font-normal text-white`}
            disabled={noteText.trim().length === 0}
          >
            <div className="flex items-center text-xl">
              <PiPaperPlaneRightBold />
            </div>
          </button>
        </form>
      </div>
    </MainContainerWithHeader>
  );
}
