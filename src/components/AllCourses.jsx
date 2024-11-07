import React, { useState, useEffect } from "react";
import Course from "./Course";
import axios from "axios";
import config from "../config"; // Импортируем base url server конфигурацию

function AllCourses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/courses`
                );
                setCourses(response.data); // Обновляем состояние курсами из базы данных
            } catch (error) {
                console.error("error", error);
            }
        };

        fetchCourses();
    }, []); // Пустой массив указывает на то, что useEffect будет вызван один раз при монтировании компонента

    return (
        <div className="justify-content-center">
            {courses.map((course) => (
                <Course
                    key={course.id}
                    courseId={course.id}
                    title={course.title}
                    description={course.description}
                    foto={course.foto}
                />
            ))}
        </div>
    );
}

export default AllCourses;
