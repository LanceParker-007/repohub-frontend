import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import {
  FiShoppingCart,
  FiChevronLeft,
  FiChevronRight,
  FiShare2,
  FiArrowUp,
} from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import axios from "axios";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-none z-10 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center`}
      style={{
        ...style,
        display: "flex",
        right: "10px",
        width: "50px",
        height: "50px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FiChevronRight className="text-white text-3xl" />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} before:content-none z-10 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center`}
      style={{
        ...style,
        display: "flex",
        left: "10px",
        width: "50px",
        height: "50px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <FiChevronLeft className="text-white text-3xl" />
    </div>
  );
};

const handleShare = (repo) => {
  if (navigator.share) {
    navigator
      .share({
        title: repo.title,
        text: repo.description,
        url: window.location.href,
      })
      .then(() => console.log("Shared successfully!"))
      .catch((error) => console.log("Error sharing:", error));
  } else {
    console.log("Share API not supported");
  }
};

// Function to check if a media file is a video
const isYouTubeVideo = (url) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split("v=")[1] || url.split("/").pop();
  return `https://www.youtube.com/embed/${videoId}`;
};

const isVideo = (mediaUrl) => {
  const videoExtensions = ["mp4", "webm", "ogg"];
  const mediaExtension = mediaUrl.split(".").pop().toLowerCase();
  return videoExtensions.includes(mediaExtension) || isYouTubeVideo(mediaUrl);
};

// Scroll to top function
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const ImageWithAmbience = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.src = src;
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {loaded && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-50 scale-110"
          style={{ backgroundImage: `url(${src})` }}
        />
      )}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-md"
        />
      </div>
    </div>
  );
};

const RepoDetails = () => {
  const { repoId } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Fetch repository details
  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_SERVER}/api/v1/repo/details`,
          { repoId }
        );
        setRepoDetails(response.data.data);
      } catch (error) {
        setError("Failed to load repository details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [repoId]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center h-screen">
        <h1>{error}</h1>
      </div>
    );
  }

  console.log(repoDetails);

  return (
    repoDetails && (
      <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
        {/* Fixed Header */}
        <header className="bg-white border-b border-slate-300 p-3.5 flex items-center justify-between shadow-md w-full">
          <div className="flex items-center">
            <Link
              to="/home"
              className="text-indigo-600 hover:text-indigo-800 mr-4"
            >
              <FiChevronLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">
              Product Details
            </h1>
          </div>
          <div className="flex gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 flex items-center"
            >
              <FiShoppingCart className="mr-2" />
              Buy
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="bg-gray-200 text-indigo-600 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center"
              onClick={() => handleShare(repoDetails)}
            >
              <FiShare2 className="mr-2" />
              Share
            </motion.button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-3 mt-16">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            {/* Carousel */}
            <div className="w-full">
              <Slider {...settings} className="product-carousel">
                {repoDetails.mediaLinks.map((media, index) => (
                  <div
                    key={index}
                    className="rounded-md bg-green-100 flex justify-center items-center h-96"
                  >
                    <div className="w-full h-full flex justify-center items-center">
                      {isVideo(media) ? (
                        isYouTubeVideo(media) ? (
                          <iframe
                            className="w-full h-full"
                            src={getYouTubeEmbedUrl(media)}
                            title={`${repoDetails.title} - Video ${index + 1}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            className="max-w-full max-h-full object-contain"
                            controls
                            src={media}
                            alt={`${repoDetails.title} - Video ${index + 1}`}
                          />
                        )
                      ) : (
                        <ImageWithAmbience
                          src={media}
                          alt={`${repoDetails.title} - Image ${index + 1}`}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h2 className="text-3xl font-bold text-slate-800">
                {repoDetails.title}
              </h2>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                By {repoDetails?.owner?.username}
              </div>
              <p className="mt-2 text-slate-600 whitespace-pre-line text-justify">
                {repoDetails.description}
              </p>

              {/* Price, Buy, and Share */}
              <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
                <span className="text-3xl font-bold text-indigo-600">
                  ${repoDetails.price.toFixed(2)}
                </span>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-indigo-500 text-white px-6 py-3 rounded-md hover:bg-indigo-600 flex items-center"
                >
                  <FiShoppingCart className="mr-2" />
                  Buy
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-200 text-indigo-600 px-4 py-3 rounded-md hover:bg-gray-300 flex items-center"
                  onClick={handleShare}
                >
                  <FiShare2 className="mr-2" />
                  Share
                </motion.button>
              </div>
            </div>
          </div>
        </main>

        {/* Back to Top Button */}
        <motion.button
          className="fixed bottom-8 right-8 bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
        >
          <FiArrowUp size={24} />
        </motion.button>
      </div>
    )
  );
};

export default RepoDetails;
