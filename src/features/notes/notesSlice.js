import { createSlice } from "@reduxjs/toolkit";
import notesData from "../../data/notes.js";

const notesSlice = createSlice({
  name: "notes",

  initialState: notesData,

  reducers: {
    addNote: (state, action) => {
      state.push(action.payload);
    },
    deleteNote: (state, action) => {
      return state.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;
