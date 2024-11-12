import React from "react";
import { Card, Button } from "react-bootstrap";
import "./Course.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import config from "../config"; // Importing base URL server configuration, example usage `${config.apiBaseUrl}/api/courses`
import { setRole, clearRole } from "../redux/userSlice"; // Экшены из Redux
import { useSelector } from "react-redux";

function Course({ courseId, title, description, foto }) {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Card className="course-card" style={{ width: "90%" }}>
                    <div className="row no-gutters">
                        <div className="col-md-8">
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text>{description}</Card.Text>

                                <Link to={courseId}>More ...</Link>
                            </Card.Body>
                        </div>
                        <div className="col-md-4">
                            <Card.Img src={foto} alt={title} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Course;
