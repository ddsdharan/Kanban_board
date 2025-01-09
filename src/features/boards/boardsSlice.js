import { createSlice } from "@reduxjs/toolkit";
import boardsData from "../../data/boardData.js";

const boardsSlice = createSlice({
  name: "boards",

  initialState: boardsData,

  reducers: {
    addBoard: (state, action) => {
      state.push(action.payload);
    },
    deleteBoard: (state, action) => {
      return state.filter((board) => board.id !== action.payload);
    },
    editBoardName: (state, action) => {
      const { id, newName } = action.payload;
      const board = state.find((board) => board.id === id);
      if (board) {
        board.name = newName;
      }
    },
    addBoardMember: (state, action) => {
      const { id, newMember } = action.payload;
      const board = state.find((board) => board.id === id);
      if (board) {
        board.members.push(newMember);
      }
    },
    addBoardNote: (state, action) => {
      const { id, newNote } = action.payload;
      const board = state.find((board) => board.id === id);
      if (board) {
        board.notes.push(newNote);
      }
    },
    deleteBoardNote: (state, action) => {
      const { boardId, noteId } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (board) {
        board.notes = board.notes.filter((note) => note.id !== noteId);
      }
    },
    addReactionToNote: (state, action) => {
      const { boardId, noteId, emoji } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (board) {
        const note = board.notes.find((note) => note.id === noteId);
        if (note && !note.reactions.includes(emoji)) {
          note.reactions.push(emoji);
        }
      }
    },
    deleteBoardCard: (state, action) => {
      const { boardId, cardId } = action.payload;
      console.log(`Deleting card ${cardId} from board ${boardId}`);
      const board = state.find((board) => board.id === boardId);
      if (board) {
        board.lists = board.lists.map((list) => {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== cardId),
          };
        });
      }
    },
    addBoardCard: (state, action) => {
      const { boardId, listId, cardInfo } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (board) {
        const list = board.lists.find((list) => list.id === listId);
        if (list) {
          list.cards.push(cardInfo);
        }
      }
    },
    editBoardCard: (state, action) => {
      const { boardId, cardId, newInfo } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (board) {
        const list = board.lists.find((list) =>
          list.cards.find((card) => card.id === cardId),
        );
        if (list) {
          const card = list.cards.find((card) => card.id === cardId);
          if (card) {
            Object.assign(card, newInfo);
          }
        }
      }
    },
    updateCardsInList: (state, action) => {
      const { boardId, listId, updatedCards } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (board) {
        const list = board.lists.find((list) => list.id === listId);
        if (list) {
          list.cards = updatedCards;
        }
      }
    },
    updateLists: (state, action) => {
      const {
        boardId,
        oldListId,
        newListId,
        updatedOldCards,
        updatedNewCards,
      } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (!board) return;

      const oldList = board.lists.find((list) => list.id === oldListId);
      const newList = board.lists.find((list) => list.id === newListId);

      if (!oldList || !newList) return;

      if (oldListId === newListId) {
        oldList.cards = updatedOldCards;
      } else {
        oldList.cards = updatedOldCards;
        newList.cards = updatedNewCards;
      }
    },
    tempUpdatedLists: (state, action) => {
      const {
        boardId,
        oldListId,
        newListId,
        updatedOldCards,
        updatedNewCards,
      } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (!board) return;

      const oldList = board.lists.find((list) => list.id === oldListId);
      const newList = board.lists.find((list) => list.id === newListId);

      if (!oldList || !newList) return;

      if (oldListId === newListId) {
        oldList.cards = updatedOldCards;
      } else {
        oldList.cards = updatedOldCards;
        newList.cards = updatedNewCards;
      }
    }
  },
});

export const {
  deleteBoard,
  editBoardName,
  addBoard,
  addBoardMember,
  addBoardNote,
  deleteBoardNote,
  addReactionToNote,
  deleteBoardCard,
  addBoardCard,
  editBoardCard,
  updateCardsInList,
  updateLists,
  tempUpdatedLists,
} = boardsSlice.actions;
export default boardsSlice.reducer;
