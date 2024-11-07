import React from "react";
import "./PopularCourses.css";

// Import images for courses
import drawingImage from "./images/drawing_course.png";
import codingImage from "./images/computer_science_course.png";
import englishImage from "./images/english_course.png";
import { Link } from "react-router-dom";

const PopularCourses = () => {
    return (
        <section className="popular-courses">
            <h2>Popular Courses</h2>

            <div className="course-cards">
                {/* Drawing Course */}
                <div className="course-card">
                    <img
                        style={{ height: "200px" }}
                        src={drawingImage}
                        alt="Drawing Course"
                        className="course-image"
                    />
                    <h3>Drawing</h3>
                    <p>
                        Learn the basics of artistic skills, including color
                        theory and shading techniques.
                    </p>
                    <Link to="/allcourses" className="btn course-btn">
                        All courses
                    </Link>
                </div>

                {/* Computer Science Course */}
                <div className="course-card">
                    <img
                        style={{ height: "200px" }}
                        src={codingImage}
                        alt="Computer Science Course"
                        className="course-image"
                    />
                    <h3>Computer Science</h3>
                    <p>
                        Create 2D games and learn programming from an early age.
                    </p>
                    <Link to="/allcourses" className="btn course-btn">
                        All courses
                    </Link>
                </div>

                {/* English Language Course */}
                <div className="course-card">
                    <img
                        style={{ height: "200px" }}
                        src={englishImage}
                        alt="English Language Course"
                        className="course-image"
                    />
                    <h3>English Language</h3>
                    <p>
                        Improve your vocabulary and develop communication skills
                        in English.
                    </p>

                    <Link to="/allcourses" className="btn course-btn">
                        All courses
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PopularCourses;
