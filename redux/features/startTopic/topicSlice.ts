import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  topic: "",  
};

export const firstMessageSlice = createSlice({
  name: "topic",
  initialState, 
  reducers: {
    setTopic: (state, action: PayloadAction<string>) => {
      state.topic = action.payload;
    },
  },
});

export const { setTopic } = firstMessageSlice.actions;

export default firstMessageSlice.reducer;
