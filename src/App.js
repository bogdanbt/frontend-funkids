// App.js
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ImportCourses from "./components/ImportCourses";
import CreateStudent from "./components/CreateStudents";
import UploadCoursesAndLessons from "./components/UploadCoursesAndLessons";
import UploadStudents from "./components/UploadStudents";
import AdminProfile from "./components/AdminProfile";
import ReportsByDate from "./components/ReportsByDate";
import AddStudentsToCourse from "./components/AddStudentsToCourse";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayouts from "./components/MainLayouts";
import NotFound from "./components/NotFound";
import AllCourses from "./components/AllCourses";
import SingleCourse from "./components/SingleCourse";
import SingleLesson from "./components/SingleLesson";
import Registration from "./components/Registration";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddCourse from "./components/AddCourse";
import AddLesson from "./components/AddLesson";
import EditCourse from "./components/EditCourse";
import EditLesson from "./components/EditLesson";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRole, clearRole } from "./redux/userSlice";
import { jwtDecode } from "jwt-decode";
import AdminPaymentWindow from "./components/AdminPaymentWindow";
import StudentsCardLibrary from "./components/StudentsCardLibrary";
import ImportLessons from "./components/ImportLessons";
function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decodedToken = jwtDecode(token);

                if (decodedToken.exp * 1000 > Date.now()) {
                    dispatch(setRole(decodedToken.role));
                } else {
                    dispatch(clearRole());
                }
            } catch (error) {
                console.error("Ошибка декодирования токена", error);
                dispatch(clearRole());
            }
        } else {
            dispatch(clearRole());
        }
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayouts />}>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="login" element={<Login />} />
                    <Route path="allcourses" element={<AllCourses />} />
                    <Route path="registration" element={<Registration />} />
                    <Route path="addcourse" element={<AddCourse />} />
                    {/* про админа  */}
                    <Route path="admin" element={<AdminProfile />} />
                    <Route
                        path="admin-import-lessons"
                        element={<ImportLessons />}
                    />
                    <Route path="admin-pay" element={<AdminPaymentWindow />} />
                    <Route
                        path="admin-students-list"
                        element={<StudentsCardLibrary />}
                    />
                    <Route path="admin-lessons" element={<ReportsByDate />} />
                    <Route
                        path="admin-create-student"
                        element={<CreateStudent />}
                    />

                    <Route
                        path="admin-import-courses"
                        element={<ImportCourses />}
                    />
                    <Route
                        path="admin-upload-students"
                        element={<UploadStudents />}
                    />
                    <Route
                        path="allcourses/:courseId/edit-lesson/:lessonId"
                        element={<EditLesson />}
                    />

                    {/* Используем courseId вместо id */}
                    <Route
                        path="allcourses/:courseId"
                        element={<SingleCourse />}
                    />
                    <Route
                        path="allcourses/:courseId/lesson/:lessonId"
                        element={<SingleLesson />}
                    />
                    <Route
                        path="allcourses/:courseId/addlesson"
                        element={<AddLesson />}
                    />

                    <Route
                        path="edit-course/:courseId"
                        element={<EditCourse />}
                    />

                    <Route
                        path="profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="profile/:courseId"
                        element={
                            <ProtectedRoute>
                                <SingleCourse />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="profile/:courseId/lesson/:lessonId"
                        element={
                            <ProtectedRoute>
                                <SingleLesson />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="profile/:courseId/addlesson"
                        element={
                            <ProtectedRoute>
                                <AddLesson />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
