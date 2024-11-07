import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config"; // Importing base URL server configuration

function EditCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState({
        title: "",
        description: "",

        foto: "",
    });

    useEffect(() => {
        // Fetch course data
        const fetchCourse = async () => {
            try {
                const response = await axios.get(
                    `${config.apiBaseUrl}/courses/${courseId}`
                );
                setCourse(response.data);
            } catch (error) {
                console.error("Error fetching course:", error);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(
                `${config.apiBaseUrl}/courses/${courseId}`,
                course,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                alert("Course successfully updated!");
                navigate("/allcourses"); // Redirect after successful update
            }
        } catch (error) {
            console.error("Error updating course:", error);
            alert("Error updating course. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Course</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Course Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={course.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={course.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="foto"
                        value={course.foto}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Update Course
                </button>
            </form>
        </div>
    );
}

export default EditCourse;
