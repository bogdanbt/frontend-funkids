import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { Button, Form, Alert } from "react-bootstrap";

const UploadUsers = () => {
    const [jsonInput, setJsonInput] = useState("");
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);

            if (!parsedData.users || !Array.isArray(parsedData.users)) {
                setMessage("Invalid format. Expected an array of users.");
                return;
            }

            const response = await axios.post(
                `${config.apiBaseUrl}/import/users`,
                parsedData
            );
            setMessage(response.data.message || "Data uploaded successfully.");
        } catch (error) {
            console.error("Error uploading data:", error);
            setMessage("Error uploading data. Please check the JSON format.");
        }
    };

    return (
        <div className="container mt-5 mb-5 d-flex justify-content-center">
            <div className="w-100" style={{ maxWidth: "600px" }}>
                <h2 className="text-center mb-4">Upload Users</h2>
                <Form.Group controlId="jsonTextarea">
                    <Form.Label>Enter JSON data for users</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder="Paste your JSON here"
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
                    Upload Data
                </Button>

                {message && (
                    <Alert
                        variant={
                            message.includes("Error") ? "danger" : "success"
                        }
                        className="mt-3 text-center"
                    >
                        {message}
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
        </div>
    );
};

export default UploadUsers;
