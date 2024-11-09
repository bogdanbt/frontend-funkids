import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { Button, Form, Alert } from "react-bootstrap";

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
        <div className="container mt-5 mb-5 d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <h2 className="text-center mb-4">Import Lessons</h2>
                <Form.Group controlId="jsonTextarea">
                    <Form.Label>Enter JSON data for lessons</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder="Paste JSON here"
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    onClick={handleUpload}
                    className="mt-3 w-100"
                    style={{
                        display: "block",
                        margin: "0 auto",
                        fontSize: "1.1rem",
                    }}
                >
                    Import Lessons
                </Button>

                {message && (
                    <Alert variant="success" className="mt-3 text-center">
                        {message}
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger" className="mt-3 text-center">
                        {error}
                    </Alert>
                )}

                <h3 className="mt-4">Example JSON Format:</h3>
                <pre
                    style={{
                        backgroundColor: "#f4f4f4",
                        padding: "10px",
                        borderRadius: "5px",
                        overflowX: "auto",
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
        </div>
    );
};

export default ImportLessons;
