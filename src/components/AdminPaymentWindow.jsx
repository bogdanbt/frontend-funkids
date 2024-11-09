// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../config"; // Importing the base URL for requests
// import {
//     FaCashRegister,
//     FaCalendarAlt,
//     FaUser,
//     FaDollarSign,
// } from "react-icons/fa";

// const AdminPaymentWindow = () => {
//     const [students, setStudents] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [selectedStudent, setSelectedStudent] = useState("");
//     const [selectedCourse, setSelectedCourse] = useState("");
//     const [voucherCount, setVoucherCount] = useState(0);
//     const [amount, setAmount] = useState(0); // Поле для ввода суммы
//     const [paymentMethod, setPaymentMethod] = useState("cash");
//     const [paymentDate, setPaymentDate] = useState(""); // Новое поле для даты
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         // Получение списка учеников (email используется вместо userId)
//         axios
//             .get(`${config.apiBaseUrl}/students/list`)
//             .then((response) => setStudents(response.data))
//             .catch((error) =>
//                 console.error("Ошибка при загрузке списка учеников:", error)
//             );

//         // Получение списка курсов
//         axios
//             .get(`${config.apiBaseUrl}/courses`)
//             .then((response) => setCourses(response.data))
//             .catch((error) =>
//                 console.error("Ошибка при загрузке курсов:", error)
//             );
//     }, []);

//     const handlePayment = async () => {
//         if (
//             !selectedStudent ||
//             !selectedCourse ||
//             voucherCount <= 0 ||
//             amount <= 0 ||
//             !paymentDate
//         ) {
//             setMessage("Пожалуйста, заполните все поля.");
//             return;
//         }

//         try {
//             console.log("Отправка данных:", {
//                 userId: selectedStudent,
//                 courseId: selectedCourse,
//                 amount, // Проверь, что amount отображается корректно
//                 numberOfVouchers: voucherCount,
//                 paymentMethod,
//                 paymentDate,
//             });
//             const response = await axios.post(
//                 `${config.apiBaseUrl}/admin/payment`,
//                 {
//                     userId: selectedStudent, // Здесь используется email пользователя вместо userId
//                     courseId: selectedCourse,
//                     amount,
//                     numberOfVouchers: voucherCount,
//                     paymentMethod,
//                     paymentDate,
//                 },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 }
//             );

//             setMessage(response.data.message);
//         } catch (error) {
//             console.error("Ошибка при внесении оплаты:", error);
//             setMessage("Ошибка при внесении оплаты.");
//         }
//     };

//     return (
//         <div
//             className="container mt-4 p-4 border rounded bg-light shadow-sm"
//             style={{ maxWidth: "400px" }}
//         >
//             <h2 className="text-center mb-4">
//                 Профиль администратора - Внесение оплаты
//             </h2>

//             <div className="mb-3">
//                 <label className="form-label">
//                     <FaUser className="me-2" />
//                     Выберите ученика:
//                 </label>
//                 <select
//                     className="form-select rounded-pill"
//                     style={{ width: "100%" }}
//                     onChange={(e) => setSelectedStudent(e.target.value)}
//                     value={selectedStudent}
//                 >
//                     <option value="">--Выберите--</option>
//                     {students.map((student) => (
//                         <option key={student.email} value={student.email}>
//                             {student.fullName} ({student.email})
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">
//                     <FaDollarSign className="me-2" />
//                     Выберите курс:
//                 </label>
//                 <select
//                     className="form-select rounded-pill"
//                     style={{ width: "100%" }}
//                     onChange={(e) => setSelectedCourse(e.target.value)}
//                     value={selectedCourse}
//                 >
//                     <option value="">--Выберите--</option>
//                     {courses.map((course) => (
//                         <option key={course.id} value={course.id}>
//                             {course.title}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">
//                     <FaCashRegister className="me-2" />
//                     Количество ваучеров:
//                 </label>
//                 <input
//                     type="number"
//                     className="form-control rounded-pill"
//                     min="1"
//                     value={voucherCount}
//                     onChange={(e) => setVoucherCount(Number(e.target.value))}
//                 />
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">
//                     <FaDollarSign className="me-2" />
//                     Сумма оплаты:
//                 </label>
//                 <input
//                     type="number"
//                     className="form-control rounded-pill"
//                     min="1"
//                     value={amount}
//                     onChange={(e) => setAmount(Number(e.target.value))}
//                 />
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">
//                     <FaCalendarAlt className="me-2" />
//                     Дата оплаты:
//                 </label>
//                 <input
//                     type="date"
//                     className="form-control rounded-pill"
//                     value={paymentDate}
//                     onChange={(e) => setPaymentDate(e.target.value)}
//                 />
//             </div>

//             <div className="mb-3">
//                 <label className="form-label">
//                     <FaCashRegister className="me-2" />
//                     Способ оплаты:
//                 </label>
//                 <select
//                     className="form-select rounded-pill"
//                     style={{ width: "100%" }}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     value={paymentMethod}
//                 >
//                     <option value="cash">Наличные</option>
//                     <option value="card">Карта</option>
//                     <option value="bank transfer">Банковский перевод</option>
//                 </select>
//             </div>

//             <div className="text-center mt-4 w-100">
//                 <button
//                     className="btn btn-primary w-100"
//                     style={{ display: "block", margin: "0 auto" }}
//                     onClick={handlePayment}
//                 >
//                     Внести оплату
//                 </button>
//             </div>

//             {message && (
//                 <p className="mt-3 alert alert-info text-center rounded-pill">
//                     {message}
//                 </p>
//             )}
//         </div>
//     );
// };

// export default AdminPaymentWindow;

import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import {
    FaCashRegister,
    FaCalendarAlt,
    FaUser,
    FaDollarSign,
} from "react-icons/fa";

const AdminPaymentWindow = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [voucherCount, setVoucherCount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [paymentDate, setPaymentDate] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${config.apiBaseUrl}/students/list`)
            .then((response) => setStudents(response.data))
            .catch((error) =>
                console.error("Error loading students list:", error)
            );

        axios
            .get(`${config.apiBaseUrl}/courses`)
            .then((response) => setCourses(response.data))
            .catch((error) => console.error("Error loading courses:", error));
    }, []);

    const handlePayment = async () => {
        if (
            !selectedStudent ||
            !selectedCourse ||
            voucherCount <= 0 ||
            amount <= 0 ||
            !paymentDate
        ) {
            setMessage("Please fill in all fields.");
            return;
        }

        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/admin/payment`,
                {
                    userId: selectedStudent,
                    courseId: selectedCourse,
                    amount,
                    numberOfVouchers: voucherCount,
                    paymentMethod,
                    paymentDate,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            setMessage(response.data.message);
        } catch (error) {
            console.error("Error processing payment:", error);
            setMessage("Error processing payment.");
        }
    };

    return (
        <div
            className="container mt-4 p-4 border rounded bg-light shadow-sm"
            style={{ maxWidth: "400px" }}
        >
            <h2 className="text-center mb-4" style={{ fontSize: "1.5rem" }}>
                Admin Profile - Payment Entry
            </h2>

            <div className="mb-3">
                <label
                    className="form-label d-block text-center"
                    style={{ fontSize: "1.1rem" }}
                >
                    <FaUser className="me-2" />
                    Select Student:
                </label>
                <select
                    className="form-select rounded-pill"
                    style={{ width: "100%", fontSize: "1.1rem" }}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    value={selectedStudent}
                >
                    <option value="">--Select--</option>
                    {students.map((student) => (
                        <option key={student.email} value={student.email}>
                            {student.fullName} ({student.email})
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label
                    className="form-label d-block text-center"
                    style={{ fontSize: "1.1rem" }}
                >
                    <FaDollarSign className="me-2" />
                    Select Course:
                </label>
                <select
                    className="form-select rounded-pill"
                    style={{ width: "100%", fontSize: "1.1rem" }}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    value={selectedCourse}
                >
                    <option value="">--Select--</option>
                    {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                            {course.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label
                    className="form-label d-block text-center"
                    style={{ fontSize: "1.1rem" }}
                >
                    <FaCashRegister className="me-2" />
                    Voucher Count:
                </label>
                <input
                    type="number"
                    className="form-control rounded-pill"
                    min="1"
                    value={voucherCount}
                    onChange={(e) => setVoucherCount(Number(e.target.value))}
                    style={{ fontSize: "1.1rem" }}
                />
            </div>

            <div className="mb-3">
                <label
                    className="form-label d-block text-center"
                    style={{ fontSize: "1.1rem" }}
                >
                    <FaDollarSign className="me-2" />
                    Payment Amount:
                </label>
                <input
                    type="number"
                    className="form-control rounded-pill"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={{ fontSize: "1.1rem" }}
                />
            </div>

            <div className="mb-3">
                <label
                    className="form-label d-block text-center"
                    style={{ fontSize: "1.1rem" }}
                >
                    <FaCalendarAlt className="me-2" />
                    Payment Date:
                </label>
                <input
                    type="date"
                    className="form-control rounded-pill"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    style={{ fontSize: "1.1rem" }}
                />
            </div>

            <div className="mb-3">
                <label
                    className="form-label d-block text-center"
                    style={{ fontSize: "1.1rem" }}
                >
                    <FaCashRegister className="me-2" />
                    Payment Method:
                </label>
                <select
                    className="form-select rounded-pill"
                    style={{ width: "100%", fontSize: "1.1rem" }}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank transfer">Bank Transfer</option>
                </select>
            </div>

            <div className="text-center mt-4 w-100">
                <button
                    className="btn btn-primary w-100"
                    style={{
                        display: "block",
                        margin: "0 auto",
                        fontSize: "1.1rem",
                    }}
                    onClick={handlePayment}
                >
                    Submit Payment
                </button>
            </div>

            {message && (
                <p
                    className="mt-3 alert alert-info text-center rounded-pill"
                    style={{ fontSize: "1.1rem" }}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default AdminPaymentWindow;
