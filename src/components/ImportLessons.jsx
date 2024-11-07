import React, { useState } from "react";
import axios from "axios";
import config from "../config"; // Импорт базового URL для запросов

const ImportLessons = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleUpload = async () => {
        if (!jsonInput.trim()) {
            setError("Please enter JSON data first.");
            return;
        }

        try {
            const lessons = JSON.parse(jsonInput);
            console.log("Sending lessons data to server:", lessons);

            const response = await axios.post(
                `${config.apiBaseUrl}/import-lessons`,
                { lessons: lessons.lessons },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setMessage("Lessons imported successfully.");
                setError("");
            }
        } catch (error) {
            console.error("Error importing lessons:", error);
            setError("Failed to import lessons. Please check the JSON format.");
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Import Lessons</h2>
            <p>Enter JSON data for lessons</p>
            <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                rows="10"
                cols="50"
                placeholder="Paste JSON here"
            />
            <button onClick={handleUpload}>Import Lessons</button>

            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

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
  "lessons": [
    {
      "id": "lesson1",
      "title": "Introduction to Chemistry",
      "description": "Basics of chemical reactions.",
      "content": "Detailed content about chemical reactions.",
      "courseId": "course1",
      "photo": "https://example.com/photo1.jpg",
      "lessonDate": "2024-01-15T10:00:00Z",
      "attendees": []
    },
    {
      "id": "lesson2",
      "title": "Advanced Mathematics",
      "description": "Exploring advanced calculus.",
      "content": "Details about calculus topics.",
      "courseId": "course2",
      "photo": "https://example.com/photo2.jpg",
      "lessonDate": "2024-02-20T14:00:00Z",
      "attendees": []
    }
  ]
}`}
            </pre>
        </div>
    );
};

export default ImportLessons;
