import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayouts from "./components/MainLayouts";
import NotFound from "./components/NotFound";
import AllCourses from "./components/AllCourses";
import Registration from "./components/Registration";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";

function App() {
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
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
