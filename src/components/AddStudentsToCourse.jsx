import React, { useState, useEffect } from "react";
import axios from "axios";

function AddStudentsToCourse({ courseId }) {
    const [students, setStudents] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get("/students/list");
                setStudents(response.data);
            } catch (error) {
                console.error("Ошибка при получении списка студентов:", error);
            }
        };
        fetchStudents();
    }, []);

    const handleStudentSelect = (studentId) => {
        setSelectedStudents((prevSelected) =>
            prevSelected.includes(studentId)
                ? prevSelected.filter((id) => id !== studentId)
                : [...prevSelected, studentId]
        );
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `/courses/${courseId}/add-students`,
                {
                    studentIds: selectedStudents,
                }
            );
            console.log(response.data.message);
            setShowModal(false);
        } catch (error) {
            console.error("Ошибка при добавлении студентов к курсу:", error);
        }
    };

    return (
        <div>
            <button onClick={() => setShowModal(true)}>
                Добавить студентов
            </button>
            {showModal && (
                <div className="modal">
                    <h3>Выберите студентов</h3>
                    <ul>
                        {students.map((student) => (
                            <li key={student._id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={student._id}
                                        onChange={() =>
                                            handleStudentSelect(student._id)
                                        }
                                    />
                                    {student.fullName}
                                </label>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSubmit}>
                        Добавить выбранных студентов
                    </button>
                    <button onClick={() => setShowModal(false)}>Отмена</button>
                </div>
            )}
        </div>
    );
}

export default AddStudentsToCourse;
