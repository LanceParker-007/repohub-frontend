import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MainComponent = () => {
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repositories, setRepositories] = useState([
    {
      id: "1",
      title: "Repo 1",
      description: "Description for Repo 1",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "2",
      title: "Repo 2",
      description: "Description for Repo 2",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "3",
      title: "Repo 3",
      description: "Description for Repo 3",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "4",
      title: "Repo 4",
      description: "Description for Repo 4",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "5",
      title: "Repo 5",
      description: "Description for Repo 5",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "6",
      title: "Repo 6",
      description: "Description for Repo 6",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]);

  return (
    <main className="flex-1 p-6 overflow-auto">
      {/* Search bar */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search repositories..."
          className="w-full bg-gray-700 text-white border-gray-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected repository */}
        {selectedRepo && (
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg">
            <img
              src={selectedRepo.image}
              alt={selectedRepo.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{selectedRepo.title}</h2>
            <p className="mb-4">{selectedRepo.description}</p>
            <Button>Buy</Button>
          </div>
        )}

        {/* Repository grid */}
        <div
          className={`grid grid-cols-2 gap-4 ${
            selectedRepo ? "lg:col-span-1" : "lg:col-span-3"
          }`}
        >
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer"
              onClick={() => setSelectedRepo(repo)}
            >
              <img
                src={repo.image}
                alt={repo.title}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="font-bold">{repo.title}</h3>
              <p className="text-sm text-gray-400 truncate">
                {repo.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainComponent;
