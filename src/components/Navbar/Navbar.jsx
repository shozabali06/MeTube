import React, { useState } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link, useNavigate } from "react-router-dom";
const Navbar = ({ setSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("ok ", searchQuery)
    navigate(`/search/${searchQuery.trim()}`);
  }
  

  return (
    <nav className="flex-div">
      <div className="nav-left flex-div">
        <img
          className="menu-icon"
          onClick={() => setSidebar((prev) => (!prev))}
          src={menu_icon}
          alt="menu_icon"
        />
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="nav-middle flex-div">
        <div className="search-box flex-div">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <img src={search_icon} onClick={handleSearch} alt="search_icon" />
        </div>
      </div>
      <div className="nav-right flex-div">
        <img src={upload_icon} alt="upload_icon" />
        <img src={more_icon} alt="upload_icon" />
        <img src={notification_icon} alt="upload_icon" />
        <img src={profile_icon} className="user-icon" alt="profile_icon" />
      </div>
    </nav>
  );
};

export default Navbar;
