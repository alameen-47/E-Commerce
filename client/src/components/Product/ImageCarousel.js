import React, { useEffect, useState } from "react";

export const ImageCarousel = ({ product }) => {
  const [updatedImages, setUpdatedImages] = useState([]);

  // Use effect to convert the image URLs when the component receives data
  useEffect(() => {
    if (Array.isArray(product?.images)) {
      const newImages = product?.images.flatMap((imageObj) =>
        imageObj.imageSet.map((img) => ({
          ...img,
          src: img.data ? `data:${img.contentType};base64,${img.data}` : null, // Create base64 image source
        }))
      );

      setUpdatedImages(newImages);
    }
  }, [product]);
  return (
    <div className="carousel rounded-box w-64 bg-gray-100 overflow-y-hidden flex align-middle items-center max-w-40 h-fit">
      {updatedImages?.map((img, index) => (
        <div
          key={index}
          className="carousel-item flex flex-col  overflow-hidden bg-white md:max-h-40 md:max-w-40 cursor-pointer"
        >
          <img
            src={img.src}
            alt=""
            className="md:px-2 object-contain transition-transform flex justify-center align-middle items-center duration-300 ease-in-out hover:scale-110 h-64 w-64 max-h-40 max-w-40"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
};
