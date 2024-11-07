// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../config"; // Importing the base URL for requests
// import Course from "./Course";
// import { Link, NavLink } from "react-router-dom";

// import { useDispatch } from "react-redux";
// import { setRole, clearRole } from "../redux/userSlice"; // Экшены из Redux
// import { useSelector } from "react-redux";

// function Profile() {
//     //const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const role = useSelector((state) => state.user.role);
//     const [courses, setCourses] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCourses = async () => {
//             const token = localStorage.getItem("token");
//             const url =
//                 role === "teacher"
//                     ? `${config.apiBaseUrl}/courses/teacher`
//                     : `${config.apiBaseUrl}/courses/student`;

//             try {
//                 const response = await axios.get(url, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setCourses(response.data);
//             } catch (error) {
//                 console.error("Error fetching courses:", error);
//             }
//         };

//         fetchCourses();
//     }, [role]);
//     return (
//         <div>
//             <div className="container">
//                 <div className="justify-content-center">
//                     <div
//                         style={{
//                             display: "flex",
//                             alignItems: "center",
//                             gap: "1rem",
//                         }}
//                     >
//                         <h2 style={{ padding: "1rem" }}>My Courses</h2>
//                         {role == "teacher" && (
//                             <NavLink className="menu-btn" to="/addcourse">
//                                 Add Course
//                             </NavLink>
//                         )}
//                     </div>

//                     {courses.length > 0 ? (
//                         courses.map((course) => (
//                             <Course
//                                 key={course.id}
//                                 courseId={course.id}
//                                 title={course.title}
//                                 description={course.description}
//                                 foto={course.foto}
//                                 registerButton={false}
//                             />
//                         ))
//                     ) : (
//                         <div className="jumbotron">
//                             <h1 className="display-4">
//                                 It seems you have no courses
//                             </h1>
//                             <p className="lead">
//                                 Explore all available courses and register for
//                                 one to get started.
//                             </p>

//                             <Link
//                                 className="btn btn-primary btn-lg"
//                                 to="/allcourses"
//                                 role="button"
//                             >
//                                 View All Courses
//                             </Link>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Profile;
// Profile.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // Importing the base URL for requests
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import { useDispatch, useSelector } from "react-redux";
import { setRole, clearRole } from "../redux/userSlice";

function Profile() {
    const dispatch = useDispatch();
    const role = useSelector((state) => state.user.role);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem("token");
            const url =
                role === "teacher"
                    ? `${config.apiBaseUrl}/courses/teacher`
                    : `${config.apiBaseUrl}/courses/student`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load courses");
            }
        };

        fetchCourses();
    }, [role]);

    return (
        <div className="container">
            {role === "teacher" ? (
                <TeacherProfile courses={courses} />
            ) : (
                <StudentProfile courses={courses} />
            )}
        </div>
    );
}

export default Profile;
