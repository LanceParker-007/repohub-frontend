import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  setPublishedRepos,
  setPurchasedRepos,
  setRepoHubAccessToken,
  setUserDetails,
} from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const FillUserDetails = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
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
            setPublishedRepos(
              JSON.parse(localStorage.getItem("publishedRepos"))
            )
          );
        } else {
          dispatch(setPublishedRepos([]));
        }

        if (localStorage.getItem("purchasedRepos")) {
          dispatch(
            setPurchasedRepos(
              JSON.parse(localStorage.getItem("purchasedRepos"))
            )
          );
        } else {
          dispatch(setPurchasedRepos([]));
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  });

  return loading ? <>Loading...</> : <>{children}</>;
};

export default FillUserDetails;
