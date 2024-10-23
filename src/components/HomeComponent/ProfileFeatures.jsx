import React from "react";
import "./ProfileFeatures.css"; // Подключаем стили для секции

const ProfileFeatures = () => {
    return (
        <section className="profile-features">
            <div className="content">
                <h2>Личный кабинет на нашем сайте</h2>
                <p>
                    Зарегистрируйтесь на нашем сайте и получите доступ к вашему
                    личному кабинету, где вы сможете:
                </p>
                <p className="icon-clock"></p> Отслеживать время занятий и
                расписание курсов
                <p className="icon-payment"></p> Контролировать статус оплаты
                мастер-классов
                <p className="icon-bell"></p> Получать важные оповещения и
                напоминания
                <p>
                    В личном кабинете вы всегда будете в курсе актуальных
                    новостей и обновлений. Все курсы, на которые вы записаны,
                    будут отображаться в удобной и структурированной форме.
                </p>
            </div>
        </section>
    );
};

export default ProfileFeatures;
