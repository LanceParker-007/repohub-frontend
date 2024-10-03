import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { signInWithGithub } from "../actions/userActions";

const initialState = {
  repoHubAccessToken: null,
  userDetails: null,
  publishedRepos: [],
  purchasedRepos: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setRepoHubAccessToken(state, action) {
      state.repoHubAccessToken = action.payload;
    },
    setUserDetails(state, action) {},
    setPublishedRepos(state, action) {},
    setPurchasedRepos(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGithub.pending, (state, action) => {})
      .addCase(signInWithGithub.fulfilled, (state, action) => {})
      .addCase(signInWithGithub.rejected, (state, action) => {});
  },
});

export const {
  setRepoHubAccessToken,
  setUserDetails,
  setPublishedRepos,
  setPurchasedRepos,
} = userSlice.actions;
const userSliceReducer = userSlice.reducer;
export default userSliceReducer;
