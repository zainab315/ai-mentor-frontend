import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  scroll: false, 
};

// Create the slice
export const scrollSlice = createSlice({
  name: "scroll",
  initialState, 
  reducers: {
    setScroll: (state, action: PayloadAction<boolean>) => {
      state.scroll = action.payload;
    }, 
  },
});

export const { setScroll } = scrollSlice.actions;

export default scrollSlice.reducer;
