import { configureStore } from "@reduxjs/toolkit";

import knittingReducer from "../features/knitting/knittingSlice";

export const store = configureStore({
    reducer:{
        knitting:knittingReducer,
    },
});