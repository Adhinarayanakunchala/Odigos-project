import axios from "axios";
import React, { useEffect, useState } from "react";
import {RiVideoLine}  from 'react-icons/ri'
import '../pages/css/Cdetails.css';
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../BaseURL";

const CourseDetails =()=>{
const [course,setCourse]=useState([]);
const [status,setStatus]=useState(0);
const navigate =useNavigate();
const userId = localStorage.getItem('userId');
const courseId=localStorage.getItem('courseId');


const getCourse =()=>{
    const token = localStorage.getItem('Token');
       
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    axios.get(BaseUrl+`/users/${userId}/courses/${courseId}/enrolled/videos?Offset=0`,config)
       .then((response)=>{
        const {data}=response;
        const {CourseVideos,Status }=data;
        setCourse(CourseVideos);
        console.log(CourseVideos);
        if(Status===1){
            setStatus(1);
            console.log(CourseVideos)
        }
       }).catch ((error)=>{
        console.log(error);
       })
};
const playVideo = (videoURL) => {
  navigate(`/play/${encodeURIComponent(videoURL)}`);
}

useEffect(()=>{
    getCourse();
},[courseId]);

    return(
        <div className="course-videos-container">
      <h1>Course Videos</h1>
      <table className="videos-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>CourseName</th>
            <th>TopicName</th>
            <th>VideoURL</th>
          </tr>
        </thead>
        <tbody>
          {course.map((video, index) => (
            <tr key={index}>
              <td>{index+1}</td>
              <td>{video.courseName}</td>
              <td>{video.topicName}</td>
              <td>
                <button type="button" onClick={() => playVideo(video.videoURL)}>
                  <RiVideoLine/>
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )
};
export default CourseDetails;