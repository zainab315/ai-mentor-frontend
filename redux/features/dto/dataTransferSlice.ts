import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    dto: {},
};

export const dataTransferSlice = createSlice({
    name: 'dto',
    initialState,
    reducers: {
        setter: (state, action) => {
            // Magic
            state.dto = (action.payload);
        }, 
        empty: (state) => { 
            state.dto = {}
        }
    },
});

// Action creators are generated for each case reducer function
export const { setter,empty } = dataTransferSlice.actions;

export default dataTransferSlice.reducer;