import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function AddLesson() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState(""); // Поле для фото
    const [lessonDate, setLessonDate] = useState("");
    const token = localStorage.getItem("token");

    const handleAddLesson = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Вы должны войти в систему, чтобы добавить урок.");
            navigate("/login");
            return;
        }

        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/courses/${courseId}/lessons`,
                { title, description, content, photo, lessonDate }, // Передаем фото
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                alert("Урок успешно добавлен.");
                navigate(`/allcourses/${courseId}`);
            }
        } catch (error) {
            console.error("Ошибка при добавлении урока:", error);
            alert("Не удалось добавить урок.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Добавить новый урок</h2>
            <Form onSubmit={handleAddLesson}>
                <Form.Group controlId="formTitle" className="mt-3">
                    <Form.Label>Название урока</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formContent" className="mt-3">
                    <Form.Label>Содержание</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPhoto" className="mt-3">
                    <Form.Label>URL изображения</Form.Label>
                    <Form.Control
                        type="text"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPhoto" className="mt-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={lessonDate}
                        onChange={(e) => setLessonDate(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Добавить урок
                </Button>
            </Form>
        </div>
    );
}

export default AddLesson;
