import React from "react";
import "./Footer.css"; // Подключаем стили для футера

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Логотип и краткое описание */}
                <div className="footer-section about">
                    <h3>Children's Club</h3>
                    <p>
                        Our mission is to develop and educate children through
                        state-of-the-art technology and creative activities.Join
                        us for an exciting learning experience!
                    </p>
                </div>

                {/* Контактная информация */}
                <div className="footer-section contacts">
                    <h4>Contacts</h4>
                    <p>
                        <i className="fas fa-map-marker-alt"></i>Ukraine, Kiev,
                        Lomonosova str. 45
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
                    <h4>We are on social networks</h4>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/fun_idea_kids/?igsh=MXFsdXM1OGIyMWlwYg%3D%3D">
                            <p className="fab fa-instagram">Instagram </p>
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2022 Kids Club. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
