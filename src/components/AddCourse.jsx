import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config"; // Importing base URL server configuration, example usage `${config.apiBaseUrl}/api/courses`
import { jwtDecode } from "jwt-decode";
function AddCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [foto, setFoto] = useState("");
    const navigate = useNavigate();

    const handleAddCourse = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const decodedToken = jwtDecode(token);

            // Проверка уникальности названия курса
            const checkResponse = await fetch(
                `${config.apiBaseUrl}/check-course-title`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ title }),
                }
            );

            const checkData = await checkResponse.json();

            if (!checkData.isUnique) {
                alert("Название курса уже существует, выберите другое.");
                return;
            }

            // Если название уникально, добавляем курс
            const response = await fetch(`${config.apiBaseUrl}/add-courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title,
                    description,

                    foto,
                    teacherId: decodedToken.id,
                }),
            });

            if (response.ok) {
                alert("Курс успешно добавлен!");
                navigate("/allcourses");
            } else {
                alert("Ошибка при добавлении курса");
            }
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Course</h2>
            <form onSubmit={handleAddCourse}>
                <div className="form-group">
                    <label>Course Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Course Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={foto}
                        className="form-control"
                        onChange={(e) => setFoto(e.target.value)} // Handling the image URL
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Add Course
                </button>
            </form>
        </div>
    );
}

export default AddCourse;
