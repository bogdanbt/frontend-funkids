import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminProfile = () => {
    return (
        <div className="container mt-5 mb-5" style={{ maxWidth: "70%" }}>
            <div className="row row-cols-1 row-cols-md-2 g-3">
                <div className="col mb-3">
                    <Link
                        to="/admin-students-list"
                        className="text-decoration-none"
                    >
                        <div className="card h-100 shadow-sm bg-light">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <p className="card-text fs-6 mb-0 text-dark">
                                    Students List
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col mb-3">
                    <Link to="/admin-lessons" className="text-decoration-none">
                        <div className="card h-100 shadow-sm bg-light">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <p className="card-text fs-6 mb-0 text-dark">
                                    Monthly Report
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col mb-3">
                    <Link to="/admin-pay" className="text-decoration-none">
                        <div className="card h-100 shadow-sm bg-light">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <p className="card-text fs-6 mb-0 text-dark">
                                    Payment
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col mb-3">
                    <Link
                        to="/admin-create-student"
                        className="text-decoration-none"
                    >
                        <div className="card h-100 shadow-sm bg-light">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <p className="card-text fs-6 mb-0 text-dark">
                                    Create Student
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col mb-3">
                    <Link
                        to="/admin-import-courses"
                        className="text-decoration-none"
                    >
                        <div className="card h-100 shadow-sm bg-light">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <p className="card-text fs-6 mb-0 text-dark">
                                    Import Courses
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col mb-3">
                    <Link
                        to="/admin-upload-students"
                        className="text-decoration-none"
                    >
                        <div className="card h-100 shadow-sm bg-light">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <p className="card-text fs-6 mb-0 text-dark">
                                    Import Students
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col mb-3">
                    <Link
                        to="/admin-import-lessons"
                        className="text-decoration-none"
                    >
                        <div className="card h-100 shadow-sm bg-light">
                            <div className="card-body d-flex align-items-center justify-content-center">
                                <p className="card-text fs-6 mb-0 text-dark">
                                    Import Lessons
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
