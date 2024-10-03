import { createSlice } from "@reduxjs/toolkit";
import { publishRepo } from "../actions/publishRepoAction";

const initialState = {
  title: "",
  description: "",
  mediaLinks: [],
  price: "",
};

const publishRepoSlice = createSlice({
  name: "publishRepoSlice",
  initialState,
  reducers: {
    setTitle(state, actoion) {},
    setDescription(state, action) {},
    setMediaLinks(state, action) {},
    setPrice(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishRepo.pending, (state, action) => {})
      .addCase(publishRepo.fulfilled, (state, action) => {})
      .addCase(publishRepo.rejected, (state, action) => {});
  },
});

export const { setTitle, setDescription, setMediaLinks, setPrice } =
  publishRepoSlice.actions;
const publishRepoSliceReducer = publishRepoSlice.reducer;
export default publishRepoSliceReducer;
