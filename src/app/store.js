import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boardsSlice.js";
import cardsReducer from "../features/cards/cardsSlice.js";
import membersReducer from "../features/members/membersSlice.js";
import notesReducer from "../features/notes/notesSlice.js";

export default configureStore({
  reducer: {
    boards: boardsReducer,
    cards: cardsReducer,
    members: membersReducer,
    notes: notesReducer,
  },
});