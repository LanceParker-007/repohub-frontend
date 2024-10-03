import React from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setRepoHubAccessToken } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const repo_hub_access_token = Cookies.get("repo_hub_access_token");

    if (repo_hub_access_token) {
      dispatch(setRepoHubAccessToken(repo_hub_access_token));
    } else {
      navigate("/signin");
    }
  }, []);

  return <>{children}</>;
};

export default Auth;
