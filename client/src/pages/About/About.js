import React from "react";
import Layout from "../../components/Layout/Layout";
import "./About.css";
const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div className="about_us-container">
        <div className="about-content">
          <h1>ABOUT US</h1>
          <p>
            RAWAD MAll<br></br>
            At RAWAD MAll, all that you see is hand-picked and 100% true –
            sourced straight from the best brands and their approved affiliates
            from KSA and over the world, only for you.<br></br>
            We present to you the most up to date – it’s in-season and
            on-incline; if it’s on the racks, it’s on the web. <br></br>Also,
            it’s nowest – have it conveyed ASAP to you, from a store close you,
            when you utilize our Phygital services.<br></br>
            It’s New and Now Barely a year from dispatch, RAWAD MAll is as of
            now in the Top 20, and one of the quickest developing, web based
            business organizations in the nation.<br></br>
            Offering adaptability in the manner in which you shop, RAWAD MAll is
            a first-of-its-kind Phygital commercial center that serves more than
            one million clients.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
