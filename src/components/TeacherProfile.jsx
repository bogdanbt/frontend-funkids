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
                }}
            >
                <h2 style={{ padding: "1rem" }}>My Courses</h2>
                <NavLink className="menu-btn" to="/addcourse">
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
                <div className="jumbotron">
                    <h1 className="display-4">It seems you have no courses</h1>
                    <p className="lead">
                        Add your first course to get started.
                    </p>
                </div>
            )}
        </div>
    );
}

export default TeacherProfile;
