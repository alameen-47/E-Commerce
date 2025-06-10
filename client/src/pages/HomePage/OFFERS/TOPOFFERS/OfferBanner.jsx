import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const items = [
  {
    name: "Offer 1",
    description: "This is the first offer",
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/heels-women-shoes-fashion-sale-flyer-design-template-9f1f3d01fdac88f9a4401d2fe138e0ff_screen.jpg?ts=1658956829",
  },
  {
    name: "Offer 2",
    description: "This is the second offer",
    image:
      "https://img.freepik.com/premium-vector/men-s-shoes-collection-orange-gradient-shoe-social-media-banner-instagram-post-template_346454-776.jpg",
  },
  {
    name: "Offer 3",
    description: "This is the third offer",
    image:
      "https://i.pinimg.com/originals/ca/6e/47/ca6e4749a64a414e0a5ab2c02dc6fe47.jpg",
  },
];

const OfferBanner = () => {
  return (
    <div className="w-full shadow-2xl  hover:scale-105">
      <Carousel animation="fade" interval={1700} indicators={false}>
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

export default OfferBanner;
