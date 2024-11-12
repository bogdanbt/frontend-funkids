// TeacherProfile.js
import React from "react";
import Course from "./Course";
import { NavLink } from "react-router-dom";

function TeacherProfile({ courses }) {
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap", // Добавлено для адаптивности
                    padding: "1rem", // Общий отступ для контейнера
                }}
            >
                <h2 style={{ margin: 0, fontSize: "1.5rem" }}>My Courses</h2>

                <NavLink
                    className="btn btn-primary btn-sm"
                    style={{
                        padding: "0.5rem 1rem", // Отступы для кнопки
                        fontSize: "0.875rem", // Адаптивный размер шрифта для кнопки
                    }}
                    to="/addcourse"
                >
                    Add Course
                </NavLink>
            </div>

            {courses.length > 0 ? (
                courses.map((course) => (
                    <Course
                        key={course.id}
                        courseId={course.id}
                        title={course.title}
                        description={course.description}
                        foto={course.foto}
                        registerButton={false}
                    />
                ))
            ) : (
                <div className="jumbotron text-center">
                    <h1 className="display-6" style={{ fontSize: "1.25rem" }}>
                        It seems you have no courses
                    </h1>
                    <p className="lead" style={{ fontSize: "1rem" }}>
                        Add your first course to get started.
                    </p>
                </div>
            )}
        </div>
    );
}

export default TeacherProfile;
