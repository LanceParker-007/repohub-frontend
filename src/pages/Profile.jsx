import React from "react";
import {
  FiEdit2,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

const user = {
  name: "Jane Developer",
  username: "janedeveloper",
  avatar:
    "https://miro.medium.com/v2/resize:fit:828/format:webp/1*fHrAZJ1_L0Ff9dvVexL5_A.png",
  bio: "Full-stack developer passionate about React, Node.js, and building awesome user experiences.",
  email: "jane@example.com",
  github: "https://github.com/janedeveloper",
  twitter: "https://twitter.com/janedeveloper",
  linkedin: "https://linkedin.com/in/janedeveloper",
  repos: 42,
  followers: 1337,
  following: 42,
};

const Profile = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-700 p-2.5 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center">
          <FiEdit2 className="mr-2" />
          Edit Profile
        </button>
      </header>
      <main className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-48 w-full object-cover md:w-48"
                src={user.avatar}
                alt={user.name}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-400 font-semibold">
                {user.username}
              </div>
              <h2 className="mt-1 text-3xl font-bold">{user.name}</h2>
              <p className="mt-2 text-gray-400">{user.bio}</p>
            </div>
          </div>
          <div className="border-t border-gray-700 px-8 py-4">
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
          </div>
          <div className="border-t border-gray-700 px-8 py-4">
            <div className="flex justify-between">
              <div className="text-center">
                <div className="text-2xl font-bold">{user.repos}</div>
                <div className="text-gray-400">Repositories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{user.followers}</div>
                <div className="text-gray-400">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{user.following}</div>
                <div className="text-gray-400">Following</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
