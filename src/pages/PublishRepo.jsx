import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FiGithub,
  FiDollarSign,
  FiImage,
  FiSave,
  FiX,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { fetchPrivateRepos, publishRepo } from "../redux/actions/repoActions";
import {
  setTitle,
  setDescription,
  setMediaLinks,
  setPrice,
  resetForm,
  setIsLoading,
} from "../redux/slices/repoSlice";
import axiosInstance from "../utils/axiosInstance";

const managePrivateReposArray = (privateRepos, setPrivateRepos) => {
  // Updating private repos without making api call
  let localStoragePublishedRepos = [];
  if (localStorage.getItem("publishedRepos")) {
    localStoragePublishedRepos = JSON.parse(
      localStorage.getItem("publishedRepos")
    );
  }

  const updatedPrivateRepos = privateRepos?.filter((privateRepo) =>
    localStoragePublishedRepos?.find(
      (localStoragePublishedRepo) =>
        localStoragePublishedRepo.repoId.toString() !==
        privateRepo.repoId.toString()
    )
  );
  setPrivateRepos(updatedPrivateRepos);
};

const PublishForm = ({ selectedRepo, setSelectedRepo }) => {
  const dispatch = useDispatch();
  const { title, description, mediaLinks, price, isPublishing, publishError } =
    useSelector((state) => state.repoSliceReducer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        dispatch(setTitle(value));
        break;
      case "description":
        dispatch(setDescription(value));
        break;
      case "price":
        dispatch(setPrice(value));
        break;
      default:
        break;
    }
  };

  const handleMediaLinkChange = (index, value) => {
    const newMediaLinks = [...mediaLinks];
    newMediaLinks[index] = value;
    dispatch(setMediaLinks(newMediaLinks));
  };

  const addMediaLink = () => {
    dispatch(setMediaLinks([...mediaLinks, ""]));
  };

  const removeMediaLink = (index) => {
    if (mediaLinks.length > 1) {
      const newMediaLinks = mediaLinks.filter((_, i) => i !== index);
      dispatch(setMediaLinks(newMediaLinks));
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (selectedRepo) {
      await dispatch(
        publishRepo({
          repoId: selectedRepo.repoId,
          title,
          description,
          mediaLinks,
          price,
        })
      );
      setSelectedRepo(null);
      dispatch(resetForm());
      // Updating private repos without making api call
      managePrivateReposArray();
    }
  };

  return selectedRepo ? (
    <form
      onSubmit={handlePublish}
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-indigo-600">
          Publish Repository
        </h2>
        <button
          onClick={() => setSelectedRepo(null)}
          className="lg:hidden text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            required
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiDollarSign className="text-gray-400" />
            </span>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Media Links
          </label>
          {mediaLinks.map((link, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="url"
                value={link}
                onChange={(e) => handleMediaLinkChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
              {mediaLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMediaLink(index)}
                  className="bg-gray-100 px-3 py-2 border border-gray-300 border-l-0 hover:bg-gray-200 transition-colors"
                >
                  <FiMinus className="text-gray-600" />
                </button>
              )}
              <button
                type="button"
                onClick={addMediaLink}
                className="bg-gray-100 px-3 py-2 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200 transition-colors"
              >
                <FiPlus className="text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className={`mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md flex items-center justify-center transition-colors ${
          isPublishing ? "opacity-75 cursor-not-allowed" : ""
        }`}
        disabled={isPublishing}
      >
        {isPublishing ? (
          "Publishing..."
        ) : (
          <>
            <FiSave className="mr-2" />
            Publish Repository
          </>
        )}
      </button>
      {publishError && (
        <p className="mt-2 text-red-600 text-sm">{publishError}</p>
      )}
    </form>
  ) : (
    <div className="bg-white border border-indigo-200 rounded-lg shadow-sm p-6">
      <p className="text-gray-500 text-center">
        Select a repository to publish
      </p>
    </div>
  );
};

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((item) => (
      <div key={item} className="bg-gray-200 h-24 rounded-lg"></div>
    ))}
  </div>
);

const PublishRepo = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.repoSliceReducer);
  const { publishedRepos } = useSelector((state) => state.userSliceReducer);
  const [privateRepos, setPrivateRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const handleRepoSelect = (repo) => {
    setSelectedRepo(repo);
    dispatch(setTitle(repo.name));
    dispatch(setDescription(repo.description || ""));
    dispatch(setPrice(""));
    dispatch(setMediaLinks([""]));
  };

  useEffect(() => {
    const getPrivateRepos = async () => {
      dispatch(setIsLoading(true));
      try {
        const { data } = await axiosInstance.get(
          `${
            import.meta.env.VITE_BACKEND_SERVER
          }/api/v1/github/private-repositories`
        );
        if (data.success) {
          const fetchedPrivateRepos = data?.data;
          const updatedFetchedPrivateRepos = fetchedPrivateRepos.filter(
            (fetchedPrivateRepo) =>
              !publishedRepos.find(
                (localStoragePublishedRepo) =>
                  localStoragePublishedRepo.repoId ===
                  fetchedPrivateRepo.repoId.toString()
              )
          );

          // Update the state with filtered repositories
          setPrivateRepos(updatedFetchedPrivateRepos);
        } else {
          throw Error(data);
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    };
    getPrivateRepos();
  }, []);

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-800 p-1 sm:p-6 w-screen overflow-hidden flex flex-col">
      <header className="mb-8 flex-shrink-0">
        <h1 className="text-4xl font-bold text-center text-indigo-600">
          Publish Your Repositories
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Select a private repository to publish and make money
        </p>
      </header>
      <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
        <main className="w-full lg:w-1/2 lg:pr-4 overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-grow custom-scrollbar">
            {isLoading ? (
              <SkeletonLoader />
            ) : (
              <ul className="space-y-4 pb-6 px-3">
                {Array.isArray(privateRepos) &&
                  privateRepos.map((repo) => (
                    <li key={repo.repoId}>
                      <div
                        className={`bg-white border rounded-lg overflow-hidden shadow-sm cursor-pointer transition-all transform hover:bg-indigo-50 ${
                          selectedRepo?.repoId === repo.repoId
                            ? "border-indigo-500 ring-2 ring-indigo-500"
                            : "border-gray-200 hover:border-indigo-300"
                        }`}
                        onClick={() => handleRepoSelect(repo)}
                      >
                        <div className="p-4 flex items-center">
                          <FiGithub
                            className="mr-3 text-indigo-400"
                            size={24}
                          />
                          <div>
                            <h3 className="font-semibold text-indigo-600 text-lg">
                              {repo.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {repo.description}
                            </p>
                          </div>
                        </div>
                      </div>
                      {selectedRepo?.repoId === repo.repoId && (
                        <div className="mt-4 lg:hidden">
                          <PublishForm
                            selectedRepo={selectedRepo}
                            setSelectedRepo={setSelectedRepo}
                          />
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </main>
        <div className="hidden lg:block w-px bg-indigo-200 mx-4 flex-shrink-0"></div>
        <aside className="hidden lg:block w-1/2 lg:pl-4 overflow-y-auto custom-scrollbar">
          {selectedRepo ? (
            <PublishForm
              selectedRepo={selectedRepo}
              setSelectedRepo={setSelectedRepo}
            />
          ) : (
            <div className="bg-white border border-indigo-200 rounded-lg shadow-sm p-6">
              <p className="text-gray-500 text-center">
                Select a repository to publish
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default PublishRepo;
