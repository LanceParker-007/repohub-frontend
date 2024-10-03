import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "../slices/userSlice";
import publishRepoSliceReducer from "../slices/publishRepoSlice.";

const store = configureStore({
  reducer: {
    userSliceReducer,
    publishRepoSliceReducer,
  },
});

export default store;
