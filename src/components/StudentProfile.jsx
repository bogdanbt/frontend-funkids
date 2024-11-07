// StudentProfile.js
import React from "react";
import Course from "./Course";
import { Link } from "react-router-dom";

function StudentProfile({ courses }) {
    return (
        <div>
            <h2 style={{ padding: "1rem" }}>My Courses</h2>
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
                        Explore all available courses and register for one to
                        get started.
                    </p>
                    <Link
                        className="btn btn-primary btn-lg"
                        to="/allcourses"
                        role="button"
                    >
                        View All Courses
                    </Link>
                </div>
            )}
        </div>
    );
}

export default StudentProfile;
