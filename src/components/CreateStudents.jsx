import React, { useState } from "react";
import axios from "axios";
import config from "../config";
import { Button, Form, Container, Alert } from "react-bootstrap";

function CreateStudent() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Default role is "student"
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/create-account`,
                {
                    fullName,
                    email,
                    password,
                    role,
                }
            );

            if (!response.data.error) {
                setMessage("User created successfully!");
                setError("");
                setFullName("");
                setEmail("");
                setPassword("");
                setRole("student");
            } else {
                setError(response.data.message);
                setMessage("");
            }
        } catch (error) {
            console.error("Error creating user:", error);
            setError("Error creating user. Please try again.");
            setMessage("");
        }
    };

    return (
        <Container className="mt-5 mb-5 d-flex justify-content-center">
            <div
                className="p-4 border rounded bg-light shadow-sm"
                style={{ maxWidth: "600px", width: "100%" }}
            >
                <h3 className="text-center mb-4">Create Account</h3>
                {message && (
                    <Alert variant="success" className="text-center">
                        {message}
                    </Alert>
                )}
                {error && (
                    <Alert variant="danger" className="text-center">
                        {error}
                    </Alert>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="fullName" className="mb-3">
                        <Form.Label className="w-100 text-center fw-bold">
                            Name
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="rounded-pill"
                        />
                    </Form.Group>

                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label className="w-100 text-center fw-bold">
                            Email Address
                        </Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="rounded-pill"
                        />
                    </Form.Group>

                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label className="w-100 text-center fw-bold">
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="rounded-pill"
                        />
                    </Form.Group>

                    <Form.Group controlId="role" className="mb-3">
                        <Form.Label className="w-100 text-center fw-bold">
                            Role
                        </Form.Label>
                        <Form.Select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            className="rounded-pill"
                            style={{
                                width: "50%",
                                height: "40px",
                                display: "block",
                                margin: "0 auto",
                                fontSize: "1.1rem",
                            }}
                        >
                            <option value="student"> Student </option>
                            <option value="teacher"> Teacher </option>
                            <option value="admin"> Administrator </option>
                        </Form.Select>
                    </Form.Group>

                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 rounded-pill"
                        style={{
                            display: "block",
                            margin: "0 auto",
                            fontSize: "1.1rem",
                        }}
                    >
                        Create Account
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

export default CreateStudent;
