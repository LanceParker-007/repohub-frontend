import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const publishRepo = createAsyncThunk(
  "publishRepo",
  async (
    { repoId, title, description, mediaLinks, price },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/repo/publish`,
        { repoId, repoName: title, description, mediaLinks, price }
      );

      if (data.success) {
        // Update localStorage
        const publishedRepos = JSON.parse(
          localStorage.getItem("publishedRepos") || "[]"
        );
        publishedRepos.push(data.data);
        localStorage.setItem("publishedRepos", JSON.stringify(publishedRepos));

        return data.data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to publish repository"
      );
    }
  }
);

export const fetchPrivateRepos = createAsyncThunk(
  "fetchPrivateRepos",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/github/private-repositories`
      );

      if (data.success) {
        const publishedRepos = JSON.parse(
          localStorage.getItem("publishedRepos") || "[]"
        );
        const filteredRepos = data.data.filter(
          (repo) => !publishedRepos.some((pub) => pub.repoId === repo.repoId)
        );
        return filteredRepos;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch private repositories"
      );
    }
  }
);
