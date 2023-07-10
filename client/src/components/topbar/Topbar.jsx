import React,{useContext} from "react";
import "./topbar.css";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext"

export default function Topbar(){
    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    return (
    <div className="topbarContainer">
         <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">Agri-Connect</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                <i class="fa-solid fa-magnifying-glass searchIcon" />
                <input className="searchInput" placeholder="Search for farmers or enthus" />                
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">HomePage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <i class="fa-solid fa-user" />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <i class="fa-solid fa-message" />
                        <span className="topbarIconBadge">5</span>
                    </div>
                    <div className="topbarIconItem">
                        <i class="fa-solid fa-bell" />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                <img src={user.profilePicture?user.profilePicture:PF+"no_profile.jpg"} alt="" className="topbarImg" />
                </Link>
            </div>
    </div>
)}
