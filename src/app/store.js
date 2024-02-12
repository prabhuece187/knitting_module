import { configureStore } from "@reduxjs/toolkit";

import knittingReducer from "../features/knitting/knittingSlice";
import { customerApi } from "../services/customerApi";

export const store = configureStore({
    reducer:{
      knitting:knittingReducer,
      [customerApi.reducerPath]: customerApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(customerApi.middleware),
}); 