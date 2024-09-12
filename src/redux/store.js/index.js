import appSliceReducer from "./slices/appSlice";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { merchApi } from "../api/merchApi";
import { authApi } from "../api/authApi";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, appSliceReducer);
export const store = configureStore({
  reducer: {
    app: persistedReducer,
    [merchApi.reducerPath]: merchApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([merchApi.middleware, authApi.middleware]);
  },
});

export let persistor = persistStore(store);
