// import React, { useState, useEffect } from "react"; // Импортируем useState и useEffect
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setRole, clearRole } from "../redux/userSlice"; // Экшены из Redux
// import { useSelector } from "react-redux";

// import "../App.css"; // Если у тебя есть стили
// function Menu() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const role = useSelector((state) => state.user.role);
//     const onLogout = () => {
//         localStorage.clear();
//         dispatch(clearRole());
//         navigate("/login");
//     };

//     return (
//         <nav className="navbar">
//             <div className="container">
//                 <div className="menu-links">
//                     <NavLink className="menu-btn" to="/">
//                         Home
//                     </NavLink>
//                     <NavLink className="menu-btn" to="/profile">
//                         Profile
//                     </NavLink>
//                     <NavLink className="menu-btn" to="/allcourses">
//                         All Courses
//                     </NavLink>
//                 </div>

//                 <div className="logout">
//                     <div className="login-logout">
//                         {!role ? (
//                             <NavLink
//                                 className="menu-btn login-logout-btn"
//                                 to="/login"
//                             >
//                                 Login
//                             </NavLink>
//                         ) : (
//                             <button
//                                 className="menu-btn login-logout-btn"
//                                 onClick={onLogout}
//                             >
//                                 Logout
//                             </button>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default Menu;
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRole, clearRole } from "../redux/userSlice";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "../App.css";

function Menu() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useSelector((state) => state.user.role);

    const onLogout = () => {
        localStorage.clear();
        dispatch(clearRole());
        navigate("/login");
    };

    return (
        <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    Fun Kids
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" className="menu-btn">
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/profile"
                            className="menu-btn"
                        >
                            Profile
                        </Nav.Link>
                        <Nav.Link
                            as={NavLink}
                            to="/allcourses"
                            className="menu-btn"
                        >
                            All Courses
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto d-flex align-items-center">
                        {!role ? (
                            <Nav.Link
                                as={NavLink}
                                to="/login"
                                className="menu-btn"
                            >
                                Login
                            </Nav.Link>
                        ) : (
                            <Button variant="outline-danger" onClick={onLogout}>
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
