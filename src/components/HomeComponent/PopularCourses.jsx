import React from "react";
import "./PopularCourses.css";

// Импортируем изображения для курсов
import drawingImage from "./images/drawing_course.png";
import codingImage from "./images/computer_science_course.png";
import englishImage from "./images/english_course.png";
import { Link } from "react-router-dom";

const PopularCourses = () => {
    return (
        <section className="popular-courses">
            <h2>Популярные курсы</h2>

            <div className="course-cards">
                {/* Курс Рисование */}
                <div className="course-card">
                    <img
                        style={{ height: "200px" }}
                        src={drawingImage}
                        alt="Курс рисования"
                        className="course-image"
                    />
                    <h3>Рисование</h3>
                    <p>
                        Освойте основы художественного мастерства, включая
                        теорию цвета и техники наложения теней.
                    </p>
                    <Link to="/allcourses" className="btn course-btn">
                        All courses
                    </Link>
                </div>

                {/* Курс Информатика */}
                <div className="course-card">
                    <img
                        style={{ height: "200px" }}
                        src={codingImage}
                        alt="Курс информатики"
                        className="course-image"
                    />
                    <h3>Информатика</h3>
                    <p>
                        Создавайте 2D игры и изучайте программирование с самого
                        раннего возраста.
                    </p>
                    <Link to="/allcourses" className="btn course-btn">
                        All courses
                    </Link>
                </div>

                {/* Курс Английский */}
                <div className="course-card">
                    <img
                        style={{ height: "200px" }}
                        src={englishImage}
                        alt="Курс английского языка"
                        className="course-image"
                    />
                    <h3>Английский язык</h3>
                    <p>
                        Улучшайте словарный запас и развивайте навыки общения на
                        английском языке.
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
