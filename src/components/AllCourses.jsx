import React, { useState, useEffect } from "react";
import Course from "./Course";
import axios from "axios";
import config from "../config"; // Импортируем base url server конфигурацию
import Spinner from "./Spinner";

function AllCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/courses`
                );
                setCourses(response.data); // Обновляем состояние курсами из базы данных
            } catch (error) {
                console.error("error", error);
            } finally {
                setLoading(false); // Отключаем состояние загрузки после завершения
            }
        };

        fetchCourses();
    }, []); // Пустой массив указывает на то, что useEffect будет вызван один раз при монтировании компонента

    return (
        <div className="justify-content-center">
            {loading ? (
                <Spinner animation="border" variant="primary" />
            ) : (
                courses.map((course) => (
                    <Course
                        key={course.id}
                        courseId={course.id}
                        title={course.title}
                        description={course.description}
                        foto={course.foto}
                    />
                ))
            )}
        </div>
    );
}

export default AllCourses;
