import { configureStore } from "@reduxjs/toolkit";

// import studyReducer from "../features/study/studySlice";

export const store = configureStore({
    reducer:{
        knitting:knittingReducer,
    },
});