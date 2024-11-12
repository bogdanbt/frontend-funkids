import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Компонент для каждой карточки
const AdminCard = ({ to, text }) => (
    <div className="col d-flex justify-content-center mb-5">
        {" "}
        {/* Центрируем карточки */}
        <Link to={to} className="text-decoration-none">
            <div
                className="card h-100 bg-light"
                style={{
                    boxShadow: "none",
                    transition: "none",
                    width: "300px",
                    maxWidth: "300px",
                }}
            >
                <div className="card-body d-flex align-items-center justify-content-center">
                    <p className="card-text fs-6 mb-0 text-dark">{text}</p>
                </div>
            </div>
        </Link>
    </div>
);

// Основной компонент AdminProfile
const AdminProfile = () => {
    // Массив с данными для каждой карточки
    const cardData = [
        { to: "/admin-students-list", text: "Students List" },
        { to: "/admin-lessons", text: "Monthly Report" },
        { to: "/admin-pay", text: "Payment" },
        { to: "/admin-create-student", text: "Create Student" },
        { to: "/admin-import-courses", text: "Import Courses" },
        { to: "/admin-upload-students", text: "Import Students" },
        { to: "/admin-import-lessons", text: "Import Lessons" },
    ];

    return (
        <div className="container-fluid mt-5 mb-5">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-3 justify-content-center">
                {cardData.map((card, index) => (
                    <AdminCard key={index} to={card.to} text={card.text} />
                ))}
            </div>
        </div>
    );
};

export default AdminProfile;
