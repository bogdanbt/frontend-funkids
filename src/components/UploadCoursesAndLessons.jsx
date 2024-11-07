import React, { useState } from "react";
import axios from "axios";
import config from "../config"; // Импорт базового URL для запросов

const UploadCoursesAndLessons = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        try {
            // Парсинг JSON перед отправкой
            const parsedData = JSON.parse(jsonInput);

            // Проверка, что данные в правильном формате
            if (!parsedData.courses || !Array.isArray(parsedData.courses)) {
                setMessage("Неверный формат данных. Ожидается массив курсов.");
                return;
            }

            // Отправка данных на сервер
            const response = await axios.post(
                `${config.apiBaseUrl}/import/courses-lessons`,
                parsedData
            );
            setMessage(response.data.message || "Данные успешно загружены.");
        } catch (error) {
            console.error("Ошибка при загрузке данных:", error);
            setMessage("Ошибка при загрузке данных. Проверьте формат JSON.");
        }
    };

    return (
        <div>
            <h2>Загрузить курсы и уроки</h2>
            <textarea
                placeholder="Вставьте ваш JSON здесь"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows={20}
                cols={100}
            />
            <br />
            <button onClick={handleUpload}>Загрузить данные</button>
            {message && (
                <p
                    style={{
                        color: message.includes("Ошибка") ? "red" : "green",
                    }}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default UploadCoursesAndLessons;
