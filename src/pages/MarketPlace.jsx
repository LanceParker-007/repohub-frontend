import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axiosInstance from "../utils/axiosInstance";
import RepoCard from "../components/repo-card/RepoCard";

export default function MarketplaceDashboard() {
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRepos, setTotalRepos] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRepositories = async (page, search) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/repo/published`,
        {
          page,
          limit: 6, // Showing 6 items per page to match the grid layout
          search,
        }
      );
      const data = response.data;
      if (data.success) {
        setRepositories(data.data.repos);
        setCurrentPage(data.data.currentPage);
        setTotalPages(data.data.totalPages);
        setTotalRepos(data.data.totalRepos);
      } else {
        console.error("Failed to fetch repositories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchRepositories(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchRepositories(1, searchTerm);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="sticky top-0 z-10 bg-white border-b border-slate-300 p-2.5 flex justify-between items-center">
        <h1 className="hidden md:block text-2xl font-bold text-slate-800">
          Marketplace
        </h1>

        <form
          onSubmit={handleSearch}
          className="relative flex-grow md:flex-grow-0 md:w-1/3"
        >
          <input
            type="text"
            placeholder="Search repositories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-slate-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </form>
      </header>

      <main className="flex-1 overflow-auto p-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo) => (
                <RepoCard key={repo.repoId} repoDetails={repo} />
              ))}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <p className="text-sm text-slate-600">
                Showing {repositories.length} of {totalRepos} repositories
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-slate-100 text-slate-600 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-slate-100 text-slate-600 disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
