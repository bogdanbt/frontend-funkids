// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../config"; // Importing the base URL for requests

// const AdminPaymentWindow = () => {
//     const [students, setStudents] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [selectedStudent, setSelectedStudent] = useState("");
//     const [selectedCourse, setSelectedCourse] = useState("");
//     const [voucherCount, setVoucherCount] = useState(0);
//     const [amount, setAmount] = useState(0); // Поле для ввода суммы
//     const [paymentMethod, setPaymentMethod] = useState("cash");
//     const [message, setMessage] = useState("");

//     useEffect(() => {
//         // Получение списка учеников без авторизации
//         axios
//             .get(`${config.apiBaseUrl}/students/list`)
//             .then((response) => setStudents(response.data))
//             .catch((error) =>
//                 console.error("Ошибка при загрузке списка учеников:", error)
//             );

//         // Получение списка курсов без авторизации
//         axios
//             .get(`${config.apiBaseUrl}/courses`)
//             .then((response) => setCourses(response.data))
//             .catch((error) =>
//                 console.error("Ошибка при загрузке курсов:", error)
//             );
//     }, []);
//     const handlePayment = async () => {
//         if (!selectedStudent || !selectedCourse || voucherCount <= 0) {
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
//             });
//             const response = await axios.post(
//                 `${config.apiBaseUrl}/admin/payment`,
//                 {
//                     userId: selectedStudent,
//                     courseId: selectedCourse,
//                     amount,
//                     numberOfVouchers: voucherCount,
//                     paymentMethod,
//                 }
//             );

//             setMessage(response.data.message);
//         } catch (error) {
//             console.error("Ошибка при внесении оплаты:", error);
//             setMessage("Ошибка при внесении оплаты.");
//         }
//     };

//     return (
//         <div>
//             <h2>Профиль администратора - Внесение оплаты</h2>
//             <label>Выберите ученика:</label>
//             <select
//                 onChange={(e) => setSelectedStudent(e.target.value)}
//                 value={selectedStudent}
//             >
//                 <option value="">--Выберите--</option>
//                 {students.map((student) => (
//                     <option key={student._id} value={student._id}>
//                         {student.fullName}
//                     </option>
//                 ))}
//             </select>

//             <label>Выберите курс:</label>
//             <select
//                 onChange={(e) => setSelectedCourse(e.target.value)}
//                 value={selectedCourse}
//             >
//                 <option value="">--Выберите--</option>
//                 {courses.map((course) => (
//                     <option key={course._id} value={course._id}>
//                         {course.title}
//                     </option>
//                 ))}
//             </select>

//             <label>Количество ваучеров:</label>
//             <input
//                 type="number"
//                 min="1"
//                 value={voucherCount}
//                 onChange={(e) => setVoucherCount(Number(e.target.value))}
//             />

//             <label>Сумма оплаты:</label>
//             <input
//                 type="number"
//                 min="1"
//                 value={amount}
//                 onChange={(e) => setAmount(Number(e.target.value))}
//             />
//             <label>Способ оплаты:</label>
//             <select
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 value={paymentMethod}
//             >
//                 <option value="cash">Наличные</option>
//                 <option value="card">Карта</option>
//                 <option value="bank transfer">Банковский перевод</option>
//             </select>

//             <button onClick={handlePayment}>Внести оплату</button>

//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default AdminPaymentWindow;
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config"; // Importing the base URL for requests

const AdminPaymentWindow = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [voucherCount, setVoucherCount] = useState(0);
    const [amount, setAmount] = useState(0); // Поле для ввода суммы
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [paymentDate, setPaymentDate] = useState(""); // Новое поле для даты
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Получение списка учеников (email используется вместо userId)
        axios
            .get(`${config.apiBaseUrl}/students/list`)
            .then((response) => setStudents(response.data))
            .catch((error) =>
                console.error("Ошибка при загрузке списка учеников:", error)
            );

        // Получение списка курсов
        axios
            .get(`${config.apiBaseUrl}/courses`)
            .then((response) => setCourses(response.data))
            .catch((error) =>
                console.error("Ошибка при загрузке курсов:", error)
            );
    }, []);

    const handlePayment = async () => {
        if (
            !selectedStudent ||
            !selectedCourse ||
            voucherCount <= 0 ||
            amount <= 0 ||
            !paymentDate
        ) {
            setMessage("Пожалуйста, заполните все поля.");
            return;
        }

        try {
            console.log("Отправка данных:", {
                userId: selectedStudent,
                courseId: selectedCourse,
                amount, // Проверь, что amount отображается корректно
                numberOfVouchers: voucherCount,
                paymentMethod,
                paymentDate,
            });
            const response = await axios.post(
                `${config.apiBaseUrl}/admin/payment`,
                {
                    userId: selectedStudent, // Здесь используется email пользователя вместо userId
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
            console.error("Ошибка при внесении оплаты:", error);
            setMessage("Ошибка при внесении оплаты.");
        }
    };

    return (
        <div>
            <h2>Профиль администратора - Внесение оплаты</h2>
            <label>Выберите ученика:</label>
            <select
                onChange={(e) => setSelectedStudent(e.target.value)}
                value={selectedStudent}
            >
                <option value="">--Выберите--</option>
                {students.map((student) => (
                    <option key={student.email} value={student.email}>
                        {student.fullName} ({student.email})
                    </option>
                ))}
            </select>

            <label>Выберите курс:</label>
            <select
                onChange={(e) => setSelectedCourse(e.target.value)}
                value={selectedCourse}
            >
                <option value="">--Выберите--</option>
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                        {course.title}
                    </option>
                ))}
            </select>

            <label>Количество ваучеров:</label>
            <input
                type="number"
                min="1"
                value={voucherCount}
                onChange={(e) => setVoucherCount(Number(e.target.value))}
            />

            <label>Сумма оплаты:</label>
            <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />

            <label>Дата оплаты:</label>
            <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
            />

            <label>Способ оплаты:</label>
            <select
                onChange={(e) => setPaymentMethod(e.target.value)}
                value={paymentMethod}
            >
                <option value="cash">Наличные</option>
                <option value="card">Карта</option>
                <option value="bank transfer">Банковский перевод</option>
            </select>

            <button onClick={handlePayment}>Внести оплату</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminPaymentWindow;
