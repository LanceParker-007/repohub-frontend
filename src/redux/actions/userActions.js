import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signInWithGithub = createAsyncThunk(
  "signInWithGithub",
  async ({ _ }, rejectWithValue) => {
    console.log("signin-with-github-called");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/github/callback`,
        {}
      );

      console.log(data);
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
