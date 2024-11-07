import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

function EditLesson() {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState(""); // Поле для фото
    const [lessonDate, setLessonDate] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/lessons/${lessonId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const lesson = response.data;
                setTitle(lesson.title);
                setDescription(lesson.description);
                setContent(lesson.content);
                setPhoto(lesson.photo); // Загружаем фото
                setLessonDate(
                    new Date(lesson.lessonDate).toISOString().split("T")[0]
                ); // Устанавливаем дату
            } catch (error) {
                console.error("Ошибка при загрузке данных урока:", error);
            }
        };

        fetchLesson();
    }, [lessonId, token]);

    const handleEditLesson = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `${config.apiBaseUrl}/lessons/${lessonId}`,
                { title, description, content, photo, lessonDate }, // Передаем фото
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Урок успешно обновлен.");
                navigate(`/profile`);
            }
        } catch (error) {
            console.error("Ошибка при обновлении урока:", error);
            alert("Не удалось обновить урок.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Редактировать урок</h2>
            <Form onSubmit={handleEditLesson}>
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
                    Сохранить изменения
                </Button>
            </Form>
        </div>
    );
}

export default EditLesson;
