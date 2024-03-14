import { configureStore } from "@reduxjs/toolkit";

import knittingReducer from "../features/knitting/knittingSlice";
import { customerApi } from "../services/master/customerApi";
import { itemApi } from "../services/master/itemApi";
import { millApi } from "../services/master/millApi";
import { yarntypeApi } from "../services/master/yarntypeApi";
import { inwardApi } from "../services/inward/inwardApi";
import { outwardApi } from "../services/outward/outwarApi";

export const store = configureStore({
    reducer:{
      knitting:knittingReducer,
      [customerApi.reducerPath]: customerApi.reducer,
      [itemApi.reducerPath]: itemApi.reducer,
      [millApi.reducerPath]: millApi.reducer,
      [yarntypeApi.reducerPath]: yarntypeApi.reducer,
      [inwardApi.reducerPath]: inwardApi.reducer,
      [outwardApi.reducerPath]: outwardApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(
        customerApi.middleware,
        itemApi.middleware,
        millApi.middleware,
        yarntypeApi.middleware,
        inwardApi.middleware,
        outwardApi.middleware,
        ),
}); 