import { configureStore } from "@reduxjs/toolkit";
import repoSlice from "./slice/repoSlice";

export const store = configureStore({
    reducer: {
        repositories: repoSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
