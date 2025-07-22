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
import OrdersCard from "../../../components/Product/Cards/OrdersCard";
import { API_BASE_URL } from "../../../utilities/api";

const Orders = () => {
  // const storedCart = JSON.parse(localStorage.getItem("CART")) || [];
  // const [cart, setCart] = useState(storedCart);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth("");

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/api/v1/orders/get-order`
      );
      console.log(data, "DATAAAAAAAAAAAAAAAAAAAAA");
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(")))))))))))", orders, "((((((((((((");

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
    getOrders();
  }, []);
  // useEffect(() => {
  //   if (auth?.token) getOrders();
  // }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="bg-white md:hidden lg:flex sm:block flex h-screen max-h-screen   lg:flex-row sm:flex-col rounded   lg:px-4 md:p-8 drop-shadow-2xl shadow-2xl">
        <UserMenu />
        <div className="bg-white lg:w-screen max-h-screen overflow-scroll  custom-scrollbar rounded-tr-lg rounded-br-lg border drop-shadow-2xl shadow-xl">
          <div
            className="lg:col-span-2  max-h-screen h-screen  sm:px-1
           py-5 md:px-6"
          >
            <div className="grid gap-4 md:gap-y-2 text-sm grid-cols-1  md:grid-cols-5 ">
              <p className="sm:text-lg lg:text-2xl px-4 uppercase font-bold sm:mb-0 md:mb-2">
                MY orders
              </p>
            </div>
            <div className="flex flex-col  justify-center   align-middle items-center">
              <div className="flex w-[96%]  justify-center items-center align-middle  border-2 h-1 rounded-xl bg-gray-500 border-gray-300 sm:mb-2  md:my-3"></div>
              {/* Divider */}
              <OrdersCard orders={orders} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
