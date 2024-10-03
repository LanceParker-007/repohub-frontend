import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { setRepoHubAccessToken } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const GithubCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { repo_hub_access_token } = useParams();

  useEffect(() => {
    if (repo_hub_access_token) {
      Cookies.set("repo_hub_access_token", repo_hub_access_token, {
        expires: 1 / 6,
      });
      dispatch(setRepoHubAccessToken(repo_hub_access_token));
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [repo_hub_access_token]);

  return <div>GithubCallback</div>;
};

export default GithubCallback;
