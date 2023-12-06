import { createSlice } from "@reduxjs/toolkit";

const initialvalue = {
    value:0,
};

const cartSlice = createSlice({
    name:"cart",
    initialvalue,
    reducers:{

    }
})


export const {} = cartSlice.actions;
export default cartSlice.reducer;