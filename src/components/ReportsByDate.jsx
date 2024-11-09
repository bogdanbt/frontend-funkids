import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { Table } from "react-bootstrap";
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
    console.log(reports);
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

            <Table striped bordered hover responsive className="mt-4">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Course</th>
                        <th>User</th>
                        <th>Role</th>
                        <th>Payment Status</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report.id}>
                            <td>
                                {new Date(report.date).toLocaleDateString()}
                            </td>
                            <td>{report.courseTitle}</td>
                            <td>{report.userFullName}</td>
                            <td>{report.userRole}</td>
                            <td>{report.paymentStatus}</td>
                            <td>{report.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ReportsByDate;
