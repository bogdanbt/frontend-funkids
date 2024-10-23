import React, { useState } from "react";
import PasswordInput from "./PasswordInput";
import axios from "axios";
//import axiosInstance from "../utils/axiosInstance";
import { validateEmail } from "../utils/helper";
import { Link, useNavigate } from "react-router-dom";
import config from "../config"; // Импортируем base url serverконфигурацию пример использования `${config.apiBaseUrl}/api/courses`

//const ApiUrl = "https://note-app-e82m.onrender.com/";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        // Login API Call
        try {
            const response = await axios.post(`${config.apiBaseUrl}/login`, {
                email: email,
                password: password,
            });

            // Handle successful login response
            if (response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
                navigate("/profile");
            }
        } catch (error) {
            // Handle login error
            console.log(error);
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
                    <form onSubmit={handleLogin}>
                        <h4 className="mb-4 text-center">Login</h4>

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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            Login
                        </button>

                        <p className="text-center mt-3">
                            Not registered yet?{" "}
                            <Link
                                to="/registration"
                                className="text-primary  "
                                style={{ fontSize: "1rem" }}
                            >
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
