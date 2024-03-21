import React from "react";
import Layout from "../../components/Layout/Layout";
import "./Contact.css";
const Contact = () => {
  return (
    <Layout title={"Contact-Us"}>
      <div className="contact-container">
        <div className="contact-content">
          <div>CONTACT US</div>
          <p>
            Any queries and info about product,<br></br>feel free to contact at
            any time
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
