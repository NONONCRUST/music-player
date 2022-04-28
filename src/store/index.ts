import {
  TypedUseSelectorHook,
  useDispatch as typedUseDispatch,
  useSelector as typedUseSelector,
} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import musicPlayerSlice from "./musicPlayerSlice";

export const store = configureStore({
  reducer: {
    musicPlayer: musicPlayerSlice,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => typedUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = typedUseSelector;
