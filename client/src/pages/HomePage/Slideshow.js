import React from "react";
import { Carousel } from "antd";
import picFurn from "./posters/Global Nomad Decor Infusing Cultural Travels into Your Space home bathroom home bedroom decorations.jpeg";
import picCosm from "./posters/Fashion, wallpapers, quotes, celebrities and so much more.jpeg";
import picElec from "./posters/Send Electronics To India From UK, Door To Door Service, Free Pickup Service.jpeg";
import picFoot from "./posters/download (6).jpeg";
const contentStyle = {
  height: "20rem",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#000",
};
const Slideshow = () => (
  <Carousel autoplay>
    <div>
      <img
        className="w-screen h-auto object-cover"
        style={contentStyle}
        src={picFurn}
        alt=""
      />
    </div>
    <div>
      <img
        className="w-screen h-auto object-cover"
        style={contentStyle}
        src={picCosm}
        alt=""
      />
    </div>
    <div>
      <img
        className="w-screen h-auto object-cover"
        style={contentStyle}
        src={picFoot}
        alt=""
      />
    </div>
    <div>
      <img
        className="w-screen h-auto object-cover"
        style={contentStyle}
        src={picElec}
        alt=""
      />
    </div>
  </Carousel>
);
export default Slideshow;
