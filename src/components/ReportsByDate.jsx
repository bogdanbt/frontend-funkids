import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

function ReportsByDate() {
    const [reports, setReports] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchReports = async () => {
        if (!startDate || !endDate) {
            alert("Пожалуйста, укажите начальную и конечную дату.");
            return;
        }

        try {
            const response = await axios.get(
                `${config.apiBaseUrl}/reportbook/by-date-range`,
                {
                    params: { startDate, endDate },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            setReports(response.data);
        } catch (error) {
            console.error("Ошибка при получении отчетов:", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchReports();
    };

    return (
        <div>
            <h2>Отчеты по диапазону дат</h2>

            {/* Форма для ввода дат */}
            <form onSubmit={handleSubmit} className="mb-4">
                <label>
                    Начальная дата:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </label>
                <label className="ml-2">
                    Конечная дата:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="btn btn-primary ml-2">
                    Показать отчеты
                </button>
            </form>

            {/* Отображение отчетов */}
            <ul>
                {reports.map((report) => (
                    <li key={report.id}>
                        <p>
                            Дата: {new Date(report.date).toLocaleDateString()}
                        </p>
                        <p>Курс ID: {report.courseId}</p>
                        <p>Урок ID: {report.lessonId}</p>
                        <p>Статус оплаты: {report.paymentStatus}</p>
                        <p>Сумма: {report.amount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReportsByDate;
