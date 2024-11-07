import "./Home.css";
import { Link } from "react-router-dom";
import heroImage from "./childHomeFoto.png"; // Обнови путь к изображению
import WhyChooseUs from "./HomeComponent/WhyChooseUs";
import ProfileFeatures from "./HomeComponent/ProfileFeatures";
import PopularCourses from "./HomeComponent/PopularCourses";
import Footer from "./HomeComponent/Footer";
const Home = () => {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Unlock your child's potential</h1>
                    <p>
                        Our Kids Club offers fun and in-depth activities for
                        children from 8 to 15 years old. With programmes based
                        on modern technology, your children won't just learn the
                        basics, they'll explore them in detail, developing
                        skills that will set them apart from their peers.
                        Courses in computer science, robotics, drawing, maths
                        and English will open up a world of new opportunities
                        for your children and prepare them for real professional
                        achievements. There are no complicated topics with us -
                        just the right approach and a desire to learn!
                    </p>
                    <div className="hero-btns">
                        <Link to="/allcourses" className="btn primary-btn">
                            All courses
                        </Link>
                        <a
                            href="https://www.instagram.com/fun_idea_kids/?igsh=MXFsdXM1OGIyMWlwYg%3D%3D"
                            className="btn secondary-btn"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="" />
                </div>
            </section>

            <WhyChooseUs />
            <PopularCourses />
            <ProfileFeatures />
            <Footer />
        </div>
    );
};

export default Home;
