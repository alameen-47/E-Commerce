import React from "react";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";

const UploadButton = ({ fileType, setIcons, setImages, setBanners }) => {
  const handleFileChange = (info) => {
    if (info.file.status === "done") {
      // Check the fileType and call the corresponding setter function
      if (fileType === "icons") {
        setIcons(info.file.originFileObj);
      } else if (fileType === "images") {
        setImages(info.file.originFileObj);
      } else if (fileType === "banners") {
        setBanners(info.file.originFileObj);
      }
    }
  };

  return (
    // <ImgCrop rotationSlider>
    <Upload
      action="https://example.com/upload" // Replace with your upload URL
      listType="picture-card"
      onChange={handleFileChange}
    >
      {/* Display upload button text or icon */}
      {fileType === "icons" && (
        <>
          +
          <br />
          Upload
          <br />
          Icons
        </>
      )}
      {fileType === "images" && (
        <>
          +
          <br />
          Upload
          <br />
          Images
        </>
      )}
      {fileType === "banners" && (
        <>
          +
          <br />
          Upload
          <br />
          Banners
        </>
      )}
    </Upload>
    // {/* </ImgCrop> */}
  );
};

export default UploadButton;
