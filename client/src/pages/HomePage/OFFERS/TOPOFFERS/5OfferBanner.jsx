import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const items = [
  {
    name: "Offer 1",
    description: "This is the first offer",
    image:
      "https://t4.ftcdn.net/jpg/02/61/01/87/360_F_261018762_f15Hmze7A0oL58Uwe7SrDKNS4fZIjLiF.jpg",
  },
  {
    name: "Offer 2",
    description: "This is the second offer",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROyHKZyL2w3VZfAUaAWugq5XAhi6ZSICK7cZiILhCwuw&s",
  },
  {
    name: "Offer 3",
    description: "This is the third offer",
    image:
      "https://wps-media.jarir.com/wp-content/uploads/2024/05/mb-ksa-230524_it-flyer-in19-summer-offers-download-en.jpg",
  },
];

const OfferBanner5 = () => {
  return (
    <div className=" w-full   shadow-2xl  hover:scale-105">
      <Carousel animation="fade" interval={2200} indicators={false}>
        {items.map((item, index) => (
          <Paper key={index}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 lg:h-[95px] object-fit"
            />
            <Typography variant="h4" component="h2">
              {item.name}
            </Typography>
            <Typography>{item.description}</Typography>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default OfferBanner5;
