import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const items = [
  {
    name: "SUPER A",
    description: "This is the first offer",
    image:
      "https://i.pinimg.com/736x/65/66/77/65667746c8d6bab69017f26cb6202df7.jpg",
  },
  {
    name: "Offer 2",
    description: "This is the second offer",
    image: "https://m.eyeofriyadh.com/news_images/2022/06/16cebce9a9787.jpg",
  },
  {
    name: "Offer 3",
    description: "This is the third offer",
    image:
      "https://www.themobileindian.com/wp-content/uploads/2022/04/Vijay-Sales-offer.jpeg",
  },
];

const OfferBanner2 = () => {
  return (
    <div className="w-full shadow-2xl  hover:scale-105">
      <Carousel animation="fade" interval={1900} indicators={false}>
        {items.map((item, index) => (
          <Paper key={index}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 lg:h-[175px] object-cover"
            />
            {/* <Typography variant="h4" component="h2">
              {item.name}
            </Typography> */}
            {/* <Typography>{item.description}</Typography> */}
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default OfferBanner2;
