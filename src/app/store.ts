import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../appSlices/postsSlice";
import ThemeReducer from "../appSlices/ThemeSlice";
import SignInReducer from "../appSlices/SignInSlice";
import filterReducer from "../appSlices/filterSlice";
import SignUpReducer from "../appSlices/SignUpSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    Theme: ThemeReducer,
    User: SignInReducer,
    Registration: SignUpReducer,
    filterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
