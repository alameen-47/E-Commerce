import React from "react";
import "./HomePage.css";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import Slideshow from "./Slideshow";
import GreetingCard from "./Furnitures";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout title={"RAWAD-MALL-Everything you Need!"}>
      <div className="flex  justify-center items-center h-screen bg-[#1111]  ">
        <div className=" h-screen w-[100dvw]">
          <Slideshow />
          <br></br>
          <GreetingCard />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
