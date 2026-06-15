import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
const initialState = {
  firstMessageID: "", 
  historyMessage : false,
};

// Create the slice
export const firstMessageSlice = createSlice({
  name: "firstMessage",
  initialState, 
  reducers: {
    setFirstMessageID: (state, action: PayloadAction<string>) => {
      state.firstMessageID = action.payload;
    }, 
    setHistoryMessage: (state, action: PayloadAction<any>) => {
        state.historyMessage = action.payload;
      },
  },
});

export const { setFirstMessageID , setHistoryMessage } = firstMessageSlice.actions;

export default firstMessageSlice.reducer;
