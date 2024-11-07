import React, { useState, useEffect } from "react"; // Импортируем useState и useEffect
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRole, clearRole } from "../redux/userSlice"; // Экшены из Redux
import { useSelector } from "react-redux";

import "../App.css"; // Если у тебя есть стили
function Menu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useSelector((state) => state.user.role);
    const onLogout = () => {
        localStorage.clear();
        dispatch(clearRole());
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="menu-links">
                    <NavLink className="menu-btn" to="/">
                        Home
                    </NavLink>
                    <NavLink className="menu-btn" to="/profile">
                        Profile
                    </NavLink>
                    <NavLink className="menu-btn" to="/allcourses">
                        All Courses
                    </NavLink>
                </div>

                <div className="logout">
                    <div className="login-logout">
                        {!role ? (
                            <NavLink
                                className="menu-btn login-logout-btn"
                                to="/login"
                            >
                                Login
                            </NavLink>
                        ) : (
                            <button
                                className="menu-btn login-logout-btn"
                                onClick={onLogout}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
