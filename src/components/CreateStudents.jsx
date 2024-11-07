// import React, { useState } from "react";
// import axios from "axios";
// import config from "../config";

// function CreateStudent() {
//     const [fullName, setFullName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(
//                 `${config.apiBaseUrl}/create-account`,
//                 {
//                     fullName,
//                     email,
//                     password,
//                     role: "student", // Устанавливаем роль студента
//                 }
//             );

//             if (!response.data.error) {
//                 alert("Студент успешно создан!");
//                 setFullName("");
//                 setEmail("");
//                 setPassword("");
//             } else {
//                 alert(`Ошибка: ${response.data.message}`);
//             }
//         } catch (error) {
//             console.error("Ошибка при создании студента:", error);
//             alert("Ошибка при создании студента");
//         }
//     };

//     return (
//         <div>
//             <h3>Создать нового студента</h3>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Полное имя:</label>
//                     <input
//                         type="text"
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Пароль:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Создать студента</button>
//             </form>
//         </div>
//     );
// }

// export default CreateStudent;
import React, { useState } from "react";
import axios from "axios";
import config from "../config";

function CreateStudent() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Роль по умолчанию — "student"

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${config.apiBaseUrl}/create-account`,
                {
                    fullName,
                    email,
                    password,
                    role, // Передаем выбранную роль
                }
            );

            if (!response.data.error) {
                alert("Пользователь успешно создан!");
                setFullName("");
                setEmail("");
                setPassword("");
                setRole("student"); // Сбрасываем роль на значение по умолчанию
            } else {
                alert(`Ошибка: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Ошибка при создании пользователя:", error);
            alert("Ошибка при создании пользователя");
        }
    };

    return (
        <div>
            <h3>Создать нового пользователя</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Полное имя:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Роль:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="student">Студент</option>
                        <option value="teacher">Учитель</option>
                        <option value="admin">Администратор</option>
                    </select>
                </div>
                <button type="submit">Создать пользователя</button>
            </form>
        </div>
    );
}

export default CreateStudent;
