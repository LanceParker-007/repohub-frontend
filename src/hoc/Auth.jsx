import React from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import {
  setPublishedRepos,
  setPurchasedRepos,
  setRepoHubAccessToken,
  setUserDetails,
} from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const repo_hub_access_token = Cookies.get("repo_hub_access_token");

    if (repo_hub_access_token) {
      dispatch(setRepoHubAccessToken(repo_hub_access_token));

      if (localStorage.getItem("userDetails")) {
        dispatch(
          setUserDetails(JSON.parse(localStorage.getItem("userDetails")))
        );
      }

      if (localStorage.getItem("publishedRepos")) {
        dispatch(
          setPublishedRepos(JSON.parse(localStorage.getItem("publishedRepos")))
        );
      } else {
        dispatch(setPublishedRepos([]));
      }
      if (localStorage.getItem("purchasedRepos")) {
        dispatch(
          setPurchasedRepos(JSON.parse(localStorage.getItem("purchasedRepos")))
        );
      } else {
        dispatch(setPurchasedRepos([]));
      }
    } else {
      navigate("/signin");
    }
  }, []);

  return <>{children}</>;
};

export default Auth;
