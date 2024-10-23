import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config"; // Импортируем base url serverконфигурацию пример использования `${config.apiBaseUrl}/api/courses`
function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [foto, setFoto] = useState("");
    const navigate = useNavigate();

    const handleAddCourse = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${config.apiBaseUrl}/add-courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Токен для авторизации
                },
                body: JSON.stringify({ title, description, date, foto }),
            });

            if (response.ok) {
                alert("Курс успешно добавлен!");
                navigate("/allcourses"); // Перенаправляем на страницу со всеми курсами
            } else {
                alert("Ошибка при добавлении курса");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Добавить новый курс</h2>
            <form onSubmit={handleAddCourse}>
                <div className="form-group">
                    <label>Название курса</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Описание курса</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Дата курса</label>
                    <input
                        type="text"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={foto}
                        className="form-control"
                        onChange={(e) => setFoto(e.target.value)} // Обрабатываем ссылку на изображение
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Добавить курс
                </button>
            </form>
        </div>
    );
}

export default AddCourse;
