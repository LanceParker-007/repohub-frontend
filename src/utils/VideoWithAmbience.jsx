import React, { useState, useEffect } from "react";

const isYouTubeVideo = (url) => {
  return url.includes("youtube.com") || url.includes("youtu.be");
};

const getYouTubeEmbedUrl = (url) => {
  const videoId = url.split("v=")[1] || url.split("/").pop();
  return `https://www.youtube.com/embed/${videoId}`;
};

export const VideoWithAmbience = ({ src, title }) => {
  const [loaded, setLoaded] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  useEffect(() => {
    if (isYouTubeVideo(src)) {
      const videoId = src.split("v=")[1] || src.split("/").pop();
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/0.jpg`);
      setLoaded(true);
    } else {
      const video = document.createElement("video");
      video.onloadedmetadata = () => {
        setLoaded(true);
        // For non-YouTube videos, we'll use the first frame as the thumbnail
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas
          .getContext("2d")
          .drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumbnailUrl(canvas.toDataURL());
      };
      video.src = src;
    }
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {loaded && thumbnailUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-50 scale-110"
          style={{ backgroundImage: `url(${thumbnailUrl})` }}
        />
      )}
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        {isYouTubeVideo(src) ? (
          <iframe
            className="aspect-video h-full"
            src={getYouTubeEmbedUrl(src)}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video
            className="max-w-full max-h-full object-contain"
            controls
            src={src}
            alt={title}
          />
        )}
      </div>
    </div>
  );
};
