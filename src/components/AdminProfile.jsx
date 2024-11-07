import React from "react";
import { Link } from "react-router-dom";

const AdminProfile = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "200px",
                margin: "20px auto",
            }}
        >
            <Link to="/admin-students-list" style={linkStyle}>
                картотека студентов
            </Link>
            <Link to="/admin-lessons" style={linkStyle}>
                отчет за месяц
            </Link>
            <Link to="/admin-pay" style={linkStyle}>
                оплата
            </Link>
            <Link to="/admin-create-student" style={linkStyle}>
                Создать студента
            </Link>

            <Link to="/admin-import-courses" style={linkStyle}>
                Импорт курсов
            </Link>
            <Link to="/admin-upload-students" style={linkStyle}>
                Импорт студентов
            </Link>
            <Link to="/admin-import-lessons" style={linkStyle}>
                Импорт уроков
            </Link>
        </div>
    );
};

const linkStyle = {
    display: "block",
    padding: "10px",
    margin: "5px 0",
    textDecoration: "none",
    color: "#333",
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    textAlign: "center",
    transition: "background-color 0.3s",
};

export default AdminProfile;
