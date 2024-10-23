import React from "react";
import "./WhyChooseUs.css"; // Подключаем стили

const WhyChooseUs = () => {
    return (
        <section className="why-choose-us">
            <h2>Почему выбрать нас?</h2>
            <div className="cards">
                <div className="card">
                    <h3>Индивидуальный подход</h3>
                    <p>Мы учитываем особенности каждого ребенка.</p>
                </div>
                <div className="card">
                    <h3>Творческий формат</h3>
                    <p>
                        Учебный процесс проходит в игровой форме, увлекая детей.
                    </p>
                </div>
                <div className="card">
                    <h3>Система наград</h3>
                    <p>За достижения дети получают сертификаты и награды.</p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
