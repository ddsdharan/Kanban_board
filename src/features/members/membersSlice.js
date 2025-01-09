import { createSlice } from "@reduxjs/toolkit";
import membersData from "../../data/members.js";

const membersSlice = createSlice({
  name: "members",

  initialState: membersData,

  reducers: {
    addMember: (state, action) => {
      state.push(action.payload);
    },
  }

});

export const { addMember } = membersSlice.actions;
export default membersSlice.reducer;