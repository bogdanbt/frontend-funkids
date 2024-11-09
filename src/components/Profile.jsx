import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // Importing the base URL for requests
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import AdminProfile from "./AdminProfile"; // Импортируем новый компонент
import { useDispatch, useSelector } from "react-redux";
import { setRole, clearRole } from "../redux/userSlice";

function Profile() {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.user.role);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (role === "admin") return; // Администратору не нужно загружать курсы

        const fetchCourses = async () => {
            const token = localStorage.getItem("token");
            const url =
                role === "teacher"
                    ? `${config.apiBaseUrl}/courses/teacher`
                    : `${config.apiBaseUrl}/courses/student`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load courses");
            }
        };

        fetchCourses();
    }, [role]);

    return (
        <div className="container">
            {role === "admin" ? (
                <AdminProfile /> // Отображаем компонент для администратора
            ) : role === "teacher" ? (
                <TeacherProfile courses={courses} />
            ) : (
                <StudentProfile courses={courses} />
            )}
        </div>
    );
}

export default Profile;
