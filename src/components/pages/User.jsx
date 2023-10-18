import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {LuView} from 'react-icons/lu';
import '../pages/css/User.css';
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../BaseURL';

const User = () => {
    const [userdata, setUserData] = useState([]);
    const [status,setStatus]=useState(0);
    const navigate=useNavigate();
    const userId = localStorage.getItem('userId');
    const Token = localStorage.getItem("Token");

    const viewData =()=>{
        navigate("/details");
    }
    const getUser = () => {
        const token = localStorage.getItem('Token');
       
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        axios.get(BaseUrl+`/users/${userId}/courses/enrolled?Offset=0`, config)
            .then((response) => {
                const {data}=response;
               const {CoursesEnrolled,Status }=data
                setUserData(CoursesEnrolled);
                console.log(CoursesEnrolled);

                if(Status===1){
                    setStatus(1);
                    if (CoursesEnrolled.length > 0) {
                        const courseId = CoursesEnrolled[0].courseId;
                        localStorage.setItem('courseId', courseId);
                        console.log(localStorage);
                      }
                }
            })
            .catch((error) => {
                console.log(error);
            })

    };
    useEffect(() => {
        if(Token){
            getUser();
        }else{
            navigate('/');
        }
       
    }, []);
    return (
        <>
        <h1>CoursesEnrolled Information</h1>
        <div className="table-container">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Course Name</th>
                        <th>Description</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {userdata.map(course => (
                        <tr key={course.courseId}>
                            <td>{course.courseId}</td>
                            <td>{course.courseName}</td>
                            <td>{course.description}</td>
                            <td><i className='view-bt' onClick={viewData}><LuView/></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
};
export default User;
