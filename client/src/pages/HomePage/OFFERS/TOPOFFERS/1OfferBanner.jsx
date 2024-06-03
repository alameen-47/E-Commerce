import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Typography } from "@mui/material";

const items = [
  {
    name: "Offer 1",
    description: "This is the first offer",
    image:
      "https://i.pinimg.com/736x/31/70/a7/3170a718979579879f8a0ef3938eb20b.jpg",
  },
  {
    name: "Offer 2",
    description: "This is the second offer",
    image:
      "https://i.pinimg.com/originals/de/cf/7b/decf7bec02081acb2e37890f17d54221.jpg",
  },
  {
    name: "Offer 3",
    description: "This is the third offer",
    image: "https://img.pikbest.com/origin/06/25/08/79HpIkbEsT2WZ.jpg!sw800",
  },
];

const OfferBanner1 = () => {
  return (
    <div className=" w-full    shadow-2xl  hover:scale-105">
      <Carousel animation="fade" interval={1800} indicators={false}>
        {items.map((item, index) => (
          <Paper key={index}>
            <img
              src={item.image}
              alt={item.name}
              className="lg:h-[350px] h-[328px] w-full object-cover "
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

export default OfferBanner1;
