import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config"; // Импортируем base url server конфигурацию

function EditCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        title: "",
        description: "",
        date: "",
        foto: "",
    });

    useEffect(() => {
        // Получаем данные о курсе
        const fetchCourse = async () => {
            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/courses/${courseId}`
                );
                setCourse(response.data);
            } catch (error) {
                console.error("Ошибка получения курса:", error);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(
                `${config.apiBaseUrl}/courses/${courseId}`,
                course,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Курс успешно обновлен!");
                navigate("/allcourses"); // Перенаправляем после успешного обновления
            }
        } catch (error) {
            console.error("Ошибка обновления курса:", error);
            alert("Ошибка обновления курса. Попробуйте снова.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Редактировать курс</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Название курса:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={course.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Описание:</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={course.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Дата:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="date"
                        value={course.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>URL картинки:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="foto"
                        value={course.foto}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Обновить курс
                </button>
            </form>
        </div>
    );
}

export default EditCourse;
