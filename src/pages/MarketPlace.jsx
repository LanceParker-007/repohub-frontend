import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { useEffect } from "react";

export default function MarketplaceDashboard() {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repositories, setRepositories] = useState([
    {
      id: "1",
      title: "React Component Library",
      description: "A comprehensive set of reusable React components",
      image:
        "https://miro.medium.com/v2/resize:fit:828/format:webp/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
      price: 49.99,
    },
    {
      id: "2",
      title: "Next.js Boilerplate",
      description: "Start your Next.js project with a solid foundation",
      image:
        "https://miro.medium.com/v2/resize:fit:828/format:webp/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
      price: 29.99,
    },
    {
      id: "3",
      title: "GraphQL API Starter",
      description: "Quick setup for GraphQL APIs with Node.js",
      image:
        "https://miro.medium.com/v2/resize:fit:828/format:webp/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
      price: 39.99,
    },
    {
      id: "4",
      title: "Vue.js Dashboard Template",
      description: "Beautiful and responsive admin dashboard for Vue.js",
      image:
        "https://miro.medium.com/v2/resize:fit:828/format:webp/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
      price: 59.99,
    },
    {
      id: "5",
      title: "React Native UI Kit",
      description: "Customizable UI components for React Native apps",
      image:
        "https://miro.medium.com/v2/resize:fit:828/format:webp/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
      price: 69.99,
    },
    {
      id: "6",
      title: "TypeScript Utilities",
      description: "A collection of useful TypeScript utilities and helpers",
      image:
        "https://miro.medium.com/v2/resize:fit:828/format:webp/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
      price: 19.99,
    },
  ]);

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-10 bg-white border-b border-slate-300 p-2.5 flex justify-between items-center">
          <h1 className="hidden md:block text-2xl font-bold text-slate-800">
            Marketplace
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
        {selectedRepo && (
          <motion.div
            layoutId={selectedRepo.id}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setSelectedRepo(null)}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedRepo.image}
                alt={selectedRepo.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-slate-800">
                {selectedRepo.title}
              </h2>
              <p className="text-slate-600 mb-4">{selectedRepo.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-indigo-600">
                  ${selectedRepo.price.toFixed(2)}
                </span>
                <button className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 transition-colors flex items-center">
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <motion.div
                key={repo.id}
                layoutId={repo.id}
                onClick={() => setSelectedRepo(repo)}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
              >
                <img
                  src={repo.image}
                  alt={repo.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-slate-800">
                    {repo.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {repo.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-indigo-600">
                      ${repo.price.toFixed(2)}
                    </span>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
