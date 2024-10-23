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
                    <h1>Раскройте потенциал вашего ребенка</h1>
                    <p>
                        Наш детский клуб предлагает увлекательные и глубокие
                        занятия для детей от 8 до 15 лет. Программы, основанные
                        на современных технологиях, помогут вашим детям не
                        просто узнать базовые вещи, но и детально изучить их,
                        развивая навыки, которые выделят их среди сверстников.
                        Курсы по информатике, робототехнике, рисованию,
                        математике и английскому языку откроют перед вашими
                        детьми мир новых возможностей и подготовят их к
                        настоящим профессиональным достижениям. С нами нет
                        сложных тем – только верный подход и желание учиться!
                    </p>
                    <div className="hero-btns">
                        <Link to="/allcourses" className="btn primary-btn">
                            All courses
                        </Link>
                        <a
                            href="https://www.instagram.com/fun_idea_kids/?igsh=MXFsdXM1OGIyMWlwYg%3D%3D"
                            className="btn secondary-btn"
                        >
                            Instagramm
                        </a>
                    </div>
                </div>
                <div className="hero-image">
                    <img src={heroImage} alt="Ребенок с карандашом" />
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
