import React from "react";
import Layout from "../../components/Layout/Layout";
import { t } from "i18next";
import background from "../../assets/about_bg.png";
const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div className="bg-white w-screen h-screen ">
        <div className="w-screen h-auto">
          <img src={background} className="md:h-[650px]  w-screen" alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default About;
