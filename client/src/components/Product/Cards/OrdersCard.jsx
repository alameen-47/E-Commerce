import React from "react";
import shipped from "../../../../src/assets/icons/Shipped.png";
import delivered from "../../../../src/assets/icons/Delivered Box.png";
import cancel from "../../../../src/assets/icons/Cancel.png";
import returned from "../../../../src/assets/icons/Return.png";
import approved from "../../../../src/assets/icons/Approval.png";
import orderPlaced from "../../../../src/assets/icons/Ordered.png";
import { ImageCarousel } from "../ImageCarousel";

const OrdersCard = ({ orders }) => {
  const statusIcons = {
    placed: orderPlaced,
    approved: approved,
    shipped: shipped,
    delivered: delivered,
    cancelled: cancel,
    returned: returned,
  };
  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className=" CARD-CONTAINER w-[95%] mb-2">
          <span className="border-3 border-black w-screen h-3"></span>
          {order.products.map((item, index) => (
            <div
              key={index}
              className="CARD. bg-[#D9D9D9]  flex  align-middle justify-between  items-center w-full max-h-[12rem] md:min-h-[8rem]  rounded-lg  md:py-4  sm:px-4 md:px-6 gap-2 sm:py-1"
            >
              <div className="flex ">
                {!item?.product.images || item?.product.images.length === 0 ? (
                  <div className="IMAGE skeleton md:px-2 object-contain rounded-xl transition-transform flex justify-center align-middle items-center duration-300 ease-in-out md:w-[17rem] md:h-[12rem]  sm:h-[5rem] sm:w-[6rem] bg-black/10"></div>
                ) : (
                  item?.product?.images
                    ?.flatMap((imageObj) =>
                      imageObj.imageSet.map((img) => {
                        let src = null;
                        if (img?.data?.data && Array.isArray(img.data.data)) {
                          const binaryStr = String.fromCharCode(
                            ...img.data.data
                          );
                          const base64 = btoa(binaryStr);
                          src = `data:${img.contentType};base64,${base64}`;
                        }
                        return { ...img, src };
                      })
                    )
                    .filter((image) => image.src)
                    .slice(0, 1)
                    .map((image, index) => (
                      <div
                        key={index}
                        className="PRODUCT-IMAGE bg-whit lg:min-w-[155px] lg:max-h-[120px] sm:h-[100px] sm:w-[90px] rounded-lg"
                      >
                        <img
                          src={image.src}
                          alt="Product Thumbnail"
                          className="object-contain w-full h-full rounded-lg"
                        />
                      </div>
                    ))
                )}
                <div className="PRODUCT-NAME-DESCRIPTION flex md:pl-5 sm:pl-2 flex-col md:w-[320px] md:max-w-[320px] sm:max-w-[150px]">
                  <h1 className="font-semibold mb-0 text-md  lg:text-lg ">
                    {item.product.name}
                  </h1>
                  <p className="mb-0 text-gray-600  leading-snug text-sm xs:hidden sm:hidden lg:flex">
                    {item.product.description}
                  </p>
                  <div className="PRODUCT-DETAILS flex flex-col items-start justify-center mt-1 md:hidden sm:gap-1">
                    <p className="text-gray-600 sm:text-xs md:text-sm mb-0">
                      Size: {item.product.size}
                    </p>
                    <p className="text-gray-600 sm:text-xs md:text-sm mb-0">
                      Color: {item.product.color}
                    </p>
                    <p className="text-gray-600 sm:text-xs md:text-sm mb-0">
                      Quantity: {item.units}
                    </p>
                  </div>
                </div>
              </div>

              <div className="PRODUCT-DETAILS flex flex-col items-start justify-center gap-2 md:flex sm:hidden">
                <p className="text-gray-600 text-sm mb-0">
                  Size: {item.product.size}
                </p>
                <p className="text-gray-600 text-sm mb-0">
                  Color: {item.product.color}
                </p>
                <p className="text-gray-600 text-sm mb-0">
                  Quantity: {item.units}
                </p>
              </div>
              <div className="PRODUCT-SAR flex flex-col justify-center align-middle items-center ">
                <h1 className="font-semibold md:text-2xl mb-0">
                  ₹: {item.product.price}/-
                </h1>
                <div className="DELIVERY-STATUS flex flex-row justify-center  align-middle items-center md:gap-2">
                  <span className="md:text-sm sm:text-[40%] text-center font-semibold ">
                    {order.status}
                  </span>
                  <img
                    src={statusIcons[order.status] || orderPlaced}
                    className="md:w-6 sm:w-3 h-auto "
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default OrdersCard;
