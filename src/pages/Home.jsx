import React from "react";
import RetractingSidebar from "../components/retracting-sidebar/RetractingSidebar";
import { Route, Routes } from "react-router-dom";
import MarketPlace from "./MarketPlace";
import Profile from "./Profile";
import CheckoutPage from "./CheckoutPage";
import PublishRepo from "./PublishRepo";
import PublishedRepos from "./PublishedRepos";
import PurchasedRepos from "./PurchasedRepos";
import Analytics from "./Analytics";
import Auth from "../hoc/Auth";
import RepoDetails from "./RepoDetails";
import FillUserDetails from "../hoc/FillUserDetails";
import NavigateTo from "../hoc/NavigateTo";

const Home = () => {
  return (
    <div className="flex bg-indigo-50">
      <RetractingSidebar />
      <Routes>
        <Route
          path="/"
          element={
            <FillUserDetails>
              <MarketPlace />
            </FillUserDetails>
          }
        />
        <Route
          path="/:repoId"
          element={
            <FillUserDetails>
              <RepoDetails />
            </FillUserDetails>
          }
        />
        <Route
          path="/profile"
          element={
            <Auth>
              <Profile />
            </Auth>
          }
        />
        <Route
          path="/publish-repository"
          element={
            <Auth>
              <PublishRepo />
            </Auth>
          }
        />
        <Route
          path="/published-repositories"
          element={
            <Auth>
              <PublishedRepos />
            </Auth>
          }
        />
        <Route
          path="/purchased-repositories"
          element={
            <Auth>
              <PurchasedRepos />
            </Auth>
          }
        />
        <Route
          path="/analytics"
          element={
            <Auth>
              <Analytics />
            </Auth>
          }
        />
        <Route
          path="/checkout"
          element={
            <Auth>
              <CheckoutPage />
            </Auth>
          }
        />
        <Route path="/*" element={<NavigateTo to="/home" />} />
      </Routes>
    </div>
  );
};

export default Home;
