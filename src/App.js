import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Router>
            <Routes>
                {/* Маршрут для домашней страницы, доступный всем */}
                <Route path="/" element={<Home />} />

                {/* Маршрут для страницы логина */}
                <Route path="/login" element={<Login />} />

                {/* Защищенный маршрут для профиля */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
