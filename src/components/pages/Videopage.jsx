import React from 'react';
import { useParams } from 'react-router-dom';
import '../pages/css/VideoPage.css';
import Odigos from '../../assets/Odigos.png';

const VideoPage = () => {
  const { videoURL } = useParams();
  const decodedVideoURL = decodeURIComponent(videoURL);

  const handleVideoError = () => {
    console.error('Error loading the video:', decodedVideoURL);
  };

  return (
    <div className="video-container">
      <h1>Course Videos</h1>
      <video controls>
        <source src={decodedVideoURL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        <img src={Odigos} alt="ODIGOS logo" />
    </div>
  );
};

export default VideoPage;
