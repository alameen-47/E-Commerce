import React from "react";
import Layout from "../../components/Layout/Layout";
import "./Contact.css";
import { t } from "i18next";
const Contact = () => {
  return (
    <Layout title={"Contact-Us"}>
      <div className="contact-container">
        <div className="contact-content text-2xl">
          <div className="text-center">{t("contact.CONTACT US")}</div>
          <p>
            {t("contact.Any queries and info about product")},<br></br>
            {t("contact.feel free to contact at any time")}
          </p>

          <h3> 📧:info@rawadmall@gmail.com</h3>
          <h3>☎️:+966 563 263 733</h3>
          <h3>📲:+966 453 363 477 </h3>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
