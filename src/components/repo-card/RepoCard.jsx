import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ImageWithAmbience } from "../../pages/RepoDetails";

const RepoCard = ({ repoDetails }) => {
  const navigate = useNavigate();
  const { repoId, repoName, description, price, mediaLinks, owner } =
    repoDetails;

  return (
    <motion.div
      key={repoId}
      layoutId={repoId}
      onClick={() => navigate(`/home/${repoId}`)} // Navigate to product details
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-shadow hover:shadow-lg"
    >
      <div className="w-full h-60 flex justify-center items-center">
        <ImageWithAmbience src={mediaLinks[0]} alt={repoName} />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-slate-800">
          {repoName}
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          {description?.substring(0, 150)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-indigo-600">${price}</span>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors">
            More Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RepoCard;
