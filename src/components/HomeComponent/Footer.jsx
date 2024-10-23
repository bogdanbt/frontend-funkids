import React from "react";
import "./Footer.css"; // Подключаем стили для футера

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Логотип и краткое описание */}
                <div className="footer-section about">
                    <h3>Детский клуб</h3>
                    <p>
                        Наша миссия — развивать и обучать детей с помощью
                        современных технологий и творческих занятий.
                        Присоединяйтесь к нам для увлекательного обучения!
                    </p>
                </div>

                {/* Контактная информация */}
                <div className="footer-section contacts">
                    <h4>Контакты</h4>
                    <p>
                        <i className="fas fa-map-marker-alt"></i> ул. Бориса
                        Гмыри 102, 12, г.Буча Украина
                    </p>
                    <p>
                        <i className="fas fa-phone-alt"></i> +38 (079) 32-43-46
                    </p>
                    <p>
                        <i className="fas fa-envelope"></i>{" "}
                        bt.tarasenko@gmail.com
                    </p>
                </div>

                {/* Социальные сети */}
                <div className="footer-section social">
                    <h4>Мы в соцсетях</h4>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/fun_idea_kids/?igsh=MXFsdXM1OGIyMWlwYg%3D%3D">
                            <p className="fab fa-instagram">Instagram </p>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2024 Детский клуб. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;
