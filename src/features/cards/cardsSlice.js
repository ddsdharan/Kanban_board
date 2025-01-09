import { createSlice } from "@reduxjs/toolkit";
import cardsData from "../../data/cards.js";

const cardsSlice = createSlice({
  name: "cards",
  initialState: cardsData,
  reducers: {
    addCard: (state, action) => {
      state.push(action.payload);
      console.log("redux cards", cardsData);

    },
    deleteCard: (state, action) => {
      return state.filter((card) => card.id !== action.payload);
    },
    editCard: (state, action) => {
      const { cardId, newInfo } = action.payload;
      const index = state.findIndex((card) => card.id === cardId);
      if (index !== -1) {
        state[index] = { ...state[index], ...newInfo };
      }
    },
  },
});

export const { addCard, deleteCard, editCard } = cardsSlice.actions;
export default cardsSlice.reducer;