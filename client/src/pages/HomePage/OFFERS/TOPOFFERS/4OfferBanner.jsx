import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const items = [
  {
    name: "Offer 1",
    description: "This is the first offer",
    image:
      "https://www.modestforever.com/pub/media/homepage/slider/m/o/mobile-banner-43_1.jpg",
  },
  {
    name: "Offer 2",
    description: "This is the second offer",
    image: "https://www.abayakart.com/assets/images/deals/offer_01_web.jpg",
  },
  {
    name: "Offer 3",
    description: "This is the third offer",
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/cosmetic-sale-design-template-6b37add89bbbbc17b1723daf6013f5ea_screen.jpg?ts=1637009598",
  },
];

const OfferBanner4 = () => {
  return (
    <div className="w-full h-fit shadow-2xl  hover:scale-105">
      <Carousel animation="fade" interval={2100} indicators={false}>
        {items.map((item, index) => (
          <Paper key={index}>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-32 lg:h-[350px]  object-cover"
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

export default OfferBanner4;
