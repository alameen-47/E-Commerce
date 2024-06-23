import React from "react";
import Layout from "../../components/Layout/Layout";
import "./About.css";
import { t } from "i18next";
const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div className="about_us-container">
        <div className="about-content">
          <h1 className="text-xl font-bold">{t("header.About Us")}</h1>
          <p className=" font-semibold text-center text-2xl">
            {t("about.RAWAD MAll")}
            <br></br>
            {t(
              "about.At RAWAD MAll, all that you see is hand-picked and 100% true – sourced straight from the best brands and their approved affiliates from KSA and over the world, only for you. We present to you the most up to date – it’s in-season and on-incline; if it’s on the racks, it’s on the web. Also, it’s nowest – have it delivered ASAP to you, from a store close to you, when you use our Phygital services. It’s New and Now Barely a year from launch, RAWAD MAll is already in the Top 20, and one of the fastest-growing, e-commerce companies in the country. Offering flexibility in the way you shop, RAWAD MAll is a first-of-its-kind Phygital marketplace that serves more than one million customers."
            )}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
