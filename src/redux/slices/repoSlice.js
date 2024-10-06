import { createSlice } from "@reduxjs/toolkit";
import { publishRepo } from "../actions/repoActions";

const initialState = {
  title: "",
  description: "",
  mediaLinks: [""],
  price: "",
  isPublishing: false,
  publishError: null,
  isLoading: false,
};

const repoSlice = createSlice({
  name: "repoSlice",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
    setDescription(state, action) {
      state.description = action.payload;
    },
    setMediaLinks(state, action) {
      state.mediaLinks = action.payload;
    },
    setPrice(state, action) {
      state.price = action.payload;
    },
    resetForm(state) {
      return initialState;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishRepo.pending, (state) => {
        state.isPublishing = true;
        state.publishError = null;
      })
      .addCase(publishRepo.fulfilled, (state) => {
        state.isPublishing = false;
        state.publishError = null;
      })
      .addCase(publishRepo.rejected, (state, action) => {
        state.isPublishing = false;
        state.publishError = action.payload;
      });
  },
});

export const {
  setTitle,
  setDescription,
  setMediaLinks,
  setPrice,
  resetForm,
  setIsLoading,
} = repoSlice.actions;
const repoSliceReducer = repoSlice.reducer;
export default repoSliceReducer;
