import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails } from "../actions/userActions";

const initialState = {
  repoHubAccessToken: null,
  userDetails: {
    githubName: "",
    githubUsername: "",
    githubUserId: "",
    githubAvatar: "",
  },
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
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
    setPublishedRepos(state, action) {
      state.publishedRepos = action.payload;
    },
    setPurchasedRepos(state, action) {
      state.purchasedRepos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state, action) => {})
      .addCase(getUserDetails.fulfilled, (state, action) => {
        localStorage.setItem(
          "userDetails",
          JSON.stringify({
            githubName: action?.payload?.name,
            githubUsername: action?.payload?.username,
            githubUserId: action?.payload?.githubId,
            githubAvatar: action?.payload?.avatar,
          })
        );
        localStorage.setItem(
          "publishedRepos",
          JSON.stringify(action?.payload?.publishedRepos)
        );
        localStorage.setItem(
          "purchasedRepos",
          JSON.stringify(action?.payload?.purchasedRepos)
        );
        state.userDetails = {
          githubName: action?.payload?.name,
          githubUsername: action?.payload?.username,
          githubUserId: action?.payload?.githubId,
          githubAvatar: action?.payload?.avatar,
        };
        state.publishedRepos = action?.payload?.publishedRepos;
        state.purchasedRepos = action?.payload?.purchasedRepos;
      })
      .addCase(getUserDetails.rejected, (state, action) => {});
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
