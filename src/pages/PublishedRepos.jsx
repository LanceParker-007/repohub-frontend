import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import RepoCard from "../components/repo-card/RepoCard";

const PublishedRepo = () => {
  const navigate = useNavigate();
  const [publishedRepos, setPublishedRepos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("publishedRepos")) {
      setPublishedRepos(JSON.parse(localStorage.getItem("publishedRepos")));
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-300 p-2.5 flex justify-between items-center">
        <h1 className="hidden md:block text-2xl font-bold text-slate-800">
          Your Published Repos
        </h1>

        <div className="relative flex-grow md:flex-grow-0 md:w-1/3">
          <input
            type="text"
            placeholder="Search repositories..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publishedRepos?.map((publishedRepo) => (
            <RepoCard key={publishedRepo.repoId} repoDetails={publishedRepo} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PublishedRepo;
