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
            <h2 className="text-center">Reports by Date Range</h2>

            {/* Date range input form */}
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                    <label className="mr-md-2 mb-2 mb-md-0">Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        className="form-control mt-1"
                        style={{
                            width: "100%",
                            maxWidth: "200px",
                        }}
                    />
                    <label className="mx-md-2 mb-2 mb-md-0">End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        className="form-control mt-1"
                        style={{
                            width: "100%",
                            maxWidth: "200px",
                        }}
                    />
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary  mt-md-0 ml-md-3 "
                        >
                            Show Reports
                        </button>
                    </div>
                </div>
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
