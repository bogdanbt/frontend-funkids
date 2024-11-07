import React from "react";
import "./WhyChooseUs.css"; // Подключаем стили

const WhyChooseUs = () => {
    return (
        <section className="why-choose-us">
            <h2>Why choose us?</h2>
            <div className="cards">
                <div className="card">
                    <h3>Personalised approach</h3>
                    <p>
                        We take into account the particularities of each child.
                    </p>
                </div>
                <div className="card">
                    <h3>Creative format</h3>
                    <p>
                        The learning process is playful and engaging for the
                        children.
                    </p>
                </div>
                <div className="card">
                    <h3>Award system</h3>
                    <p>
                        Children receive certificates and awards for their
                        achievements.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
