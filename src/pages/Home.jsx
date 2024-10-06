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

const Home = () => {
  return (
    <div className="flex bg-indigo-50">
      <RetractingSidebar />
      <Routes>
        <Route path="/" element={<MarketPlace />} />
        <Route path="/:repoId" element={<RepoDetails />} />
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
      </Routes>
    </div>
  );
};

export default Home;
