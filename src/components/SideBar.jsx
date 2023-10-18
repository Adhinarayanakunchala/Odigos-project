import React, { useState } from 'react';
import {FaBars,FaUser,FaSignOutAlt}from "react-icons/fa";
import {HiHome} from 'react-icons/hi';
import { NavLink, useNavigate} from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import  OdigosLogo from "../assets/odigoslogo.jpeg";

const SideBar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (!isOpen);
    const { setIsLogin, setTokens } = useAuth();
    const Navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        setTokens(null);
        setIsLogin(false);
        Navigate('/');
      };

    const menuItem=[
        {
            path:"/user",
            name:"Courses",
            icon:<FaUser/>
        }, 
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "210px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
                   <img  src= {OdigosLogo} alt='Logo'style={{display:isOpen ? "block":"none"}}/>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
               <button type="button" onClick={logout} className="logout-button">
        <div className="icon logout-icon">
          <FaSignOutAlt />
        </div>
        <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
          Logout
        </div>
      </button>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default SideBar;