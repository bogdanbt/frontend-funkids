import React, { useState, useEffect } from "react"; // Импортируем useState и useEffect
import { NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "../App.css"; // Если у тебя есть стили
function Menu() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // проверка на роль учителя

    const [isTeacher, setIsTeacher] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken); // Убедитесь, что токен содержит роль
            // Проверяем, если роль пользователя — 'teacher'
            if (decodedToken.role === "teacher") {
                setIsTeacher(true);
            }
            console.log("isTeacher State:", isTeacher); // Проверяем состояние
        }
    }, []);

    // Отслеживаем обновление состояния
    useEffect(() => {
        console.log("isTeacher State updated:", isTeacher);
    }, [isTeacher]);
    ///

    const onLogout = () => {
        localStorage.clear();
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
                    {isTeacher && (
                        <NavLink className="menu-btn" to="/addcourse">
                            Add Course
                        </NavLink>
                    )}
                </div>

                <div className="logout">
                    <div className="login-logout">
                        {!token ? (
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
