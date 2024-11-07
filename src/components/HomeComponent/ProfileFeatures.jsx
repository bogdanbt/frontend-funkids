import React from "react";
import "./ProfileFeatures.css"; // Import styles for the section

const ProfileFeatures = () => {
    return (
        <section className="profile-features">
            <div className="content">
                <h2>Personal Account on Our Website</h2>
                <p>
                    Register on our website and gain access to your personal
                    account, where you can:
                </p>
                <p className="icon-clock"></p> Track class times and course
                schedules
                <p className="icon-payment"></p> Monitor the payment status of
                masterclasses
                <p className="icon-bell"></p> Receive important notifications
                and reminders
                <p>
                    In your personal account, you will always be aware of the
                    latest news and updates. All the courses you are enrolled in
                    will be displayed in a convenient and structured form.
                </p>
            </div>
        </section>
    );
};

export default ProfileFeatures;
