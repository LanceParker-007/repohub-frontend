import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../slices/userSlice";
import repoSliceReducer from "../slices/repoSlice";

const store = configureStore({
  reducer: {
    userSliceReducer,
    repoSliceReducer,
  },
});

export default store;
