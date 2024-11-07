import React, { useState } from "react";
import axios from "axios";
import config from "../config"; // Импорт базового URL для запросов

const UploadUsers = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        try {
            // Парсинг JSON перед отправкой
            const parsedData = JSON.parse(jsonInput);

            // Проверка, что данные в правильном формате
            if (!parsedData.users || !Array.isArray(parsedData.users)) {
                setMessage(
                    "Неверный формат данных. Ожидается массив пользователей."
                );
                return;
            }

            // Отправка данных на сервер
            const response = await axios.post(
                `${config.apiBaseUrl}/import/users`,
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
            <h2>Загрузить пользователей</h2>
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

            {/* Пример JSON ниже */}
            <h3>Example JSON Format:</h3>
            <pre
                style={{
                    backgroundColor: "#f4f4f4",
                    padding: "10px",
                    borderRadius: "5px",
                }}
            >
                {`{
  "users": [
    {
      "fullName": "Student One",
      "email": "student1@example.com",
      "password": "password123",
      "role": "student"
    },
    {
      "fullName": "Student Two",
      "email": "student2@example.com",
      "password": "password123",
      "role": "student"
    },
    {
      "fullName": "Student Three",
      "email": "student3@example.com",
      "password": "password123",
      "role": "student"
    },
    {
      "fullName": "Teacher One",
      "email": "teacher1@example.com",
      "password": "password123",
      "role": "teacher"
    }
  ]
}`}
            </pre>
        </div>
    );
};

export default UploadUsers;
