import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { Card, Container, Row, Col } from "react-bootstrap";

const StudentCard = ({ student }) => {
    return (
        <Card
            className="mb-4 shadow-sm"
            style={{
                minWidth: "250px",
                backgroundColor: "#f9f9f9",
                borderRadius: "12px",
                border: "1px solid #e0e0e0",
            }}
        >
            <Card.Body>
                <Card.Title
                    className="text-primary"
                    style={{ fontSize: "1.2rem", fontWeight: "600" }}
                >
                    {student.fullName}
                </Card.Title>
                <Card.Text style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                    <strong>Email:</strong> {student.email}
                </Card.Text>
                <h5
                    style={{
                        fontSize: "1rem",
                        marginTop: "1rem",
                        fontWeight: "500",
                    }}
                >
                    Courses:
                </h5>
                {student.courses && student.courses.length > 0 ? (
                    student.courses.map((course, index) => (
                        <div
                            key={course.courseId || index}
                            style={{ padding: "0.5rem 0" }}
                        >
                            <p style={{ margin: 0, color: "#495057" }}>
                                <strong>Course:</strong> {course.courseTitle}
                            </p>
                            <p style={{ margin: 0, color: "#495057" }}>
                                <strong>Total Vouchers:</strong>{" "}
                                {course.totalVouchers}
                            </p>
                        </div>
                    ))
                ) : (
                    <p style={{ color: "#adb5bd" }}>No registered courses</p>
                )}
            </Card.Body>
        </Card>
    );
};

const StudentsCardLibrary = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios
            .get(`${config.apiBaseUrl}/students/details`)
            .then((response) => setStudents(response.data))
            .catch((error) =>
                console.error("Error fetching students data:", error)
            );
    }, []);

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Student Library</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {students.map((student) => (
                    <Col key={student.email}>
                        <StudentCard student={student} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default StudentsCardLibrary;
