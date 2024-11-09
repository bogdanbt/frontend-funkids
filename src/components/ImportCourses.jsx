import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { Button, Form, Alert } from "react-bootstrap";

function ImportCourses() {
    const [jsonInput, setJsonInput] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleJsonInputChange = (e) => {
        setJsonInput(e.target.value);
        setMessage("");
        setError("");
    };

    const handleUpload = async () => {
        if (!jsonInput.trim()) {
            setError("Please enter JSON data first.");
            return;
        }

        try {
            const courses = JSON.parse(jsonInput);
            console.log("Sending data to server:", courses);
            const response = await axios.post(
                `${config.apiBaseUrl}/import-courses`,
                { courses: courses.courses },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 201) {
                setMessage("Courses imported successfully.");
                setError("");
            }
        } catch (error) {
            console.error("Error importing courses:", error);
            setError("Failed to import courses. Please check the JSON format.");
            setMessage("");
        }
    };

    return (
        <div className="container mt-5 mb-5 d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <h2 className="text-center mb-4">Import Courses</h2>
                <Form.Group controlId="jsonTextarea">
                    <Form.Label>Enter JSON data for courses</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        value={jsonInput}
                        onChange={handleJsonInputChange}
                        placeholder="Paste JSON data here..."
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
                    Import Courses
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
    "courses": [
        {
            "id": "course6",
            "title": "Advanced Web Development",
            "description": "Explore advanced concepts in web development, including modern frameworks and best practices.",
            "foto": "https://example.com/web-development.jpg",
            "teacherId": "teacher2@gmail.com",
            "students": [],
            "lessonIds": []
        },
        {
            "id": "course7",
            "title": "Data Science for Beginners",
            "description": "An introduction to data science concepts, including tools and techniques.",
            "foto": "https://example.com/data-science.jpg",
            "teacherId": "teacher2@gmail.com",
            "students": [],
            "lessonIds": []
        }
    ]
}`}
                </pre>
            </div>
        </div>
    );
}

export default ImportCourses;
