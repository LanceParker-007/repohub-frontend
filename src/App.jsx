import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import PageDoesNotExist from "./pages/PageDoesNotExist";
import GithubCallback from "./pages/GithubCallback";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<Signin />} />
      <Route
        path="/github-auth-successful/:repo_hub_access_token"
        element={<GithubCallback />}
      />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      <Route path="/home/*" element={<Home />} />
      <Route path="/*" element={<PageDoesNotExist />} />
    </Routes>
  );
};

export default App;
