import React, { useEffect, useState } from "react";
import "./Orders.css";
import Layout from "../../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../../context/auth";
import moment from "moment";
import { CartProvider } from "../../../context/cart";
import toast from "react-hot-toast";
import { t } from "i18next";
import { UserMenu } from "../../../components/Layout/UserMenu";
import shipped from "../../../../src/assets/icons/Shipped.png";
import delivered from "../../../../src/assets/icons/Delivered Box.png";
import cancel from "../../../../src/assets/icons/Cancel.png";
import returned from "../../../../src/assets/icons/Return.png";
import approved from "../../../../src/assets/icons/Approval.png";
import orderPlaced from "../../../../src/assets/icons/Ordered.png";
const Orders = () => {
  const storedCart = JSON.parse(localStorage.getItem("CART")) || [];
  const [cart, setCart] = useState(storedCart);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth("");
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  //total price
  // const totalcheckoutPrice = () => {
  //   const totalcheckout = 0;
  //   return (totalcheckout += units.price * units.units + 10);
  // };

  //cancel order
  const cancelOrder = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `${auth.token}`,
        },
      };
      await axios.delete(`/api/v1/auth/orders/cancel/${id}`, config);
      toast.success("Order Cancelled Succesfully");
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.log(error);
      toast.error("Error while Cancelling the Order");
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="bg-white md:hidden lg:flex sm:block flex h-screen max-h-screen   lg:flex-row sm:flex-col rounded   lg:px-4 md:p-8 drop-shadow-2xl shadow-2xl">
        <UserMenu />
        <div className="bg-white lg:w-screen max-h-screen overflow-scroll  custom-scrollbar rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
          <div className="lg:col-span-2  max-h-screen h-screen px-4 py-5 sm:px-6">
            <div className="grid gap-4 md:gap-y-2 text-sm grid-cols-1  md:grid-cols-5 ">
              <p className="sm:text-lg lg:text-2xl px-4 uppercase font-bold sm:mb-0 md:mb-2">
                MY orders
              </p>
            </div>
            <div className="flex flex-col  justify-center   align-middle items-center">
              <div className="flex w-[96%]  justify-center items-center align-middle  border-2 h-1 rounded-xl bg-gray-500 border-gray-300 sm:mb-2 md:my-3"></div>
              {/* Divider */}
              <div className=" CARD-CONTAINER w-[95%] ">
                <div className="CARD. bg-[#D9D9D9] flex  align-middle justify-between  items-center w-full max-h-[12rem] min-h-[8rem]  rounded-lg  md:py-4  sm:px-4 md:px-6 gap-2">
                  <div className="flex">
                    <div className="PRODUCT-IMAGE bg-white lg:min-w-[155px] lg:max-h-[120px] sm:h-[100px] sm:w-[90px] rounded-lg">
                      <img
                        src="https://picsum.photos/150/125"
                        alt="Product Thumbnail"
                        className="object-contain w-full h-full rounded-lg"
                      />
                    </div>
                    <div className="PRODUCT-NAME-DESCRIPTION flex md:pl-5 sm:pl-2 flex-col md:w-[320px] md:max-w-[320px] sm:max-w-[150px]">
                      <h1 className="font-semibold mb-0 text-md  lg:text-lg ">
                        Product Name
                      </h1>
                      <p className="mb-0 text-gray-600  leading-snug text-sm xs:hidden sm:hidden lg:flex">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Aspernatur itaque Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Aspernatur itaque
                      </p>
                      <div className="PRODUCT-DETAILS flex flex-col items-start justify-center mt-1 md:hidden sm:gap-1">
                        <p className="text-gray-600 sm:text-xs md:text-sm mb-0">
                          Size: $100
                        </p>
                        <p className="text-gray-600 sm:text-xs md:text-sm mb-0">
                          Color: Black
                        </p>
                        <p className="text-gray-600 sm:text-xs md:text-sm mb-0">
                          Quantity: 1
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="PRODUCT-DETAILS flex flex-col items-start justify-center gap-2 md:flex sm:hidden">
                    <p className="text-gray-600 text-sm mb-0">Size: $100</p>
                    <p className="text-gray-600 text-sm mb-0">Color: Black</p>
                    <p className="text-gray-600 text-sm mb-0">Quantity: 1</p>
                  </div>
                  <div className="PRODUCT-SAR flex flex-col justify-center align-middle items-center ">
                    <h1 className="font-semibold md:text-2xl mb-0">SR:455/-</h1>
                    <div className="DELIVERY-STATUS flex flex-row justify-center  align-middle items-center md:gap-2">
                      <span className="md:text-sm sm:text-xs">Confirmed</span>
                      <img
                        src={approved}
                        className="w-full md:h-5 sm:h-4 "
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
