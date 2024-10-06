import React from "react";
import {
  FiEdit2,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import { useSelector } from "react-redux";

const Profile = () => {
  const { userDetails, publishedRepos, purchasedRepos } = useSelector(
    (state) => state.userSliceReducer
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-300 p-3.5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        {/* <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center">
          <FiEdit2 className="mr-2" />
          Editable in the future
        </button> */}
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={userDetails.githubAvatar}
                alt={userDetails.githubAvatar}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-400 font-semibold">
                {userDetails.githubUsername}
              </div>
              <h2 className="mt-1 text-3xl font-bold">
                {userDetails.githubName}
              </h2>
              <button className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center">
                <FiEdit2 className="mr-2" />
                Editable in the future
              </button>
            </div>
          </div>
          {/* <div className="border-t border-gray-700 px-8 py-4">
            <div className="flex flex-wrap justify-between">
              <div className="flex items-center mr-4 mb-2">
                <FiMail className="mr-2 text-gray-400" />
                <a
                  href={`mailto:${user.email}`}
                  className="hover:text-indigo-400"
                >
                  {user.email}
                </a>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <FiGithub className="mr-2 text-gray-400" />
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400"
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center mr-4 mb-2">
                <FiTwitter className="mr-2 text-gray-400" />
                <a
                  href={user.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400"
                >
                  Twitter
                </a>
              </div>
              <div className="flex items-center mb-2">
                <FiLinkedin className="mr-2 text-gray-400" />
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-400"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div> */}
          <div className="border-t border-gray-700 px-3 py-4">
            <div className="flex justify-between bg-indigo-100 rounded-sm p-3">
              <div className="text-center">
                <div className="text-xl font-bold">
                  {publishedRepos?.length}
                </div>
                <div className="text-gray-400">Published Repos</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{purchasedRepos.length}</div>
                <div className="text-gray-400">Purchased Repos</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">
                  1000 <span className="text-green-600">$</span>
                </div>
                <div className="text-gray-400">Total Earnings </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
