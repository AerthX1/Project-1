import { configureStore } from "@reduxjs/toolkit";
import reducer from "./userSlice";


export const store = configureStore({
    reducer:{
        reducer: reducer
    }
})