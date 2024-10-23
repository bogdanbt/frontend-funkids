import axios from "axios";
import React, { useState } from "react";
import PasswordInput from "../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import config from "../config"; // Импортируем base url server конфигурацию

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teacherCode, setTeacherCode] = useState(""); // Добавляем состояние для кода
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        // SignUp API Call
        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/create-account`,
                {
                    fullName: name,
                    email: email,
                    password: password,
                    teacherCode: teacherCode, // Отправляем код учителя (если заполнен)
                }
            );

            // Handle successful registration response
            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }

            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/profile");
            }
        } catch (error) {
            // Handle login error
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div
                    className="card shadow-lg p-4"
                    style={{
                        width: "400px",
                        backgroundColor: "white",
                        color: "black",
                    }}
                >
                    <form onSubmit={handleSignUp}>
                        <h4 className="mb-4 text-center">Sign Up</h4>

                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <PasswordInput
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Поле для кода учителя */}
                        <div className="mb-3">
                            <label className="form-label">
                                Teacher Code (optional)
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter teacher code"
                                value={teacherCode}
                                onChange={(e) => setTeacherCode(e.target.value)}
                            />
                        </div>

                        {error && <p className="text-danger small">{error}</p>}

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            style={{
                                margin: "0",
                                padding: "10px 20px",
                                minHeight: "40px",
                            }}
                        >
                            Create Account
                        </button>

                        <p className="text-center mt-3">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-primary"
                                style={{ fontSize: "1rem" }}
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
