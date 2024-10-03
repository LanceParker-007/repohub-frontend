import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const publishRepo = createAsyncThunk(
  "publishRepo",
  async ({ title, description, mediaLinks, price }, { rejectWithValue }) => {
    console.log(title, description, mediaLinks, price);
    return;
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/publish-repository`,
        {}
      );
    } catch (error) {
      rejectWithValue();
    }
  }
);
