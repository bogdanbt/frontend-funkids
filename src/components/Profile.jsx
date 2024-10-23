import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // Импортируем базовый URL для запросов
import Course from "./Course";
function Profile() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyCourses = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Вы не авторизованы.");
                return;
            }

            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/my-courses`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Передаем токен
                        },
                    }
                );

                if (response.status === 200) {
                    setCourses(response.data); // Сохраняем курсы в состояние
                }
            } catch (error) {
                setError("Ошибка при получении курсов.");
                console.error("Ошибка получения курсов:", error);
            }
        };

        fetchMyCourses(); // Вызываем функцию при монтировании компонента
    }, []);

    return (
        <div>
            <h2>Мои курсы</h2>
            <div className="justify-content-center">
                {courses.map((course) => (
                    <Course
                        key={course.id}
                        courseId={course.id}
                        title={course.title}
                        description={course.description}
                        foto={course.foto}
                        registerButton={false}
                        //isTeacher={isTeacher}
                        //removeCourseFromList={removeCourseFromList} // Передаем функцию удаления
                    />
                ))}
            </div>
        </div>
    );
}

export default Profile;
