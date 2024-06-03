import React from "react";
import { Carousel } from "antd";
import picFurn from "./posters/furn.jpg";
import picCosm from "./posters/cosm.jpg";
import picElec from "./posters/elec.jpg";
import picFoot from "./posters/shoe.jpg";
import { Link } from "react-router-dom";
const contentStyle = {
  height: "20rem",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#000",
  borderRadius: "4px",
  dropShadow: "-10px -10px 10px pink",
};
const Slideshow = () => (
  <div className="shadow-2xl">
    <Carousel autoplay>
      <div>
        <Link to={"/category/furnitures"}>
          <img
            className="w-screen h-auto object-cover drop-shadow-xl	"
            style={contentStyle}
            src={picFurn}
            alt=""
          />
        </Link>
      </div>
      <div>
        <Link to={"/category/cosmetics"}>
          <img
            className=" w-screen h-auto object-cover drop-shadow-xl	"
            style={contentStyle}
            src={picCosm}
            alt=""
          />
        </Link>
      </div>

      <div>
        <Link to={"/category/footwears"}>
          <img
            className=" w-screen h-auto object-cover drop-shadow-xl	"
            style={contentStyle}
            src={picFoot}
            alt=""
          />
        </Link>
      </div>
      <div>
        <Link to={"/category/Electronics"}>
          <img
            className=" w-screen h-auto object-cover drop-shadow-xl	"
            style={contentStyle}
            src={picElec}
            alt=""
          />
        </Link>
      </div>
    </Carousel>
  </div>
);
export default Slideshow;
