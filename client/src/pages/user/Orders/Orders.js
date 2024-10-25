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
      <div class="bg-slate-300 flex  lg:flex-row sm:flex-col  shadow-lg  px-4 md:p-8 mb-6">
        <UserMenu />
        <div class="bg-slate-300 lg:w-screen  shadow  border rounded-tr-lg rounded-br-lg">
          <div class="lg:col-span-2 px-4 py-5 sm:px-0 lg:h-screen overflow-auto ">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5 ">
              <p className="sm:text-lg lg:text-2xl px-4">
                {t("orders.Your Orders")}
              </p>
            </div>
            {/* <p className="text-pretty">{JSON.stringify(orders, null, 4)}</p> */}
            {orders?.map((o, i) => {
              console.log(orders);
              return (
                <div class="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10 ">
                  <table class="w-full table-fixed">
                    <thead>
                      <tr class="bg-gray-100 ">
                        <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                          #
                        </td>
                        <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                          {t("orders.STATUS")}
                        </td>
                        {/* <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                          Buyer
                        </td> */}
                        <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                          {t("orders.ORDERED DATE")}
                        </td>
                        <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                          {t("orders.PAYMENT")}
                        </td>
                        <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                          {t("orders.QUANTITY")}
                        </td>
                        <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                          {t("orders.TOTAL PAID")}
                        </td>
                        <td class="lg:w-1/4 py-4 lg:px-6 sm:p-1 sm:w-1/5 text-center text-gray-600 font-bold uppercase lg:text-base sm:text-[0.6rem]">
                          {t("orders.CANCEL")}
                        </td>
                      </tr>
                    </thead>
                    <tbody className="py-5 bg-slate-300">
                      <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                        {i + 1}
                      </th>
                      <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                        {o?.status}
                      </th>

                      <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                        {moment(o?.createdAt).fromNow()}
                      </th>
                      <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                        {o?.payment.success ? "Success" : "Failed"}
                      </th>
                      <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                        {o?.products?.length}
                      </th>
                      <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                        {/* {o?.products.price + 10} */}
                        {o?.products.reduce(
                          (sum, product) => sum + product.price,
                          0
                        ) + 10}
                      </th>
                      <th class="lg:w-1/4 lg:py-4 sm:text-[0.55rem] lg:text-base ">
                        <button
                          className="btn btn-outline btn-error sm:text-xs  text-sm"
                          onClick={() => cancelOrder(o._id)}
                        >
                          {t("orders.Cancel Order")}
                        </button>
                      </th>
                    </tbody>
                  </table>
                  {o?.products.map((units, index) => (
                    <div
                      key={units._id}
                      className="flex items-center border-b border-t lg:py-4 lg:pl-4 sm:pl-4 sm:pt-2"
                    >
                      <div className="flex lg:w-1/4">
                        {/* product */}
                        <div className="lg:w-20 sm:w-12">
                          <img
                            className="lg:h-auto sm:h-20  lg:aspect-auto object-contain  "
                            src={`/api/v1/product/product-image/${units._id}`}
                            alt={units.name}
                          />
                        </div>
                        <div className="flex flex-col  ml-4 flex-grow  justify-center align-middle">
                          <span className="font-bold lg:text-sm sm:text-[0.5rem]">
                            {units.name}
                          </span>
                          <span className="text-gray-600 lg:text-xs sm:text-[0.4rem]">
                            {units.description
                              ? units.description.substring(0, 50)
                              : ""}
                          </span>
                        </div>
                      </div>
                      <span className="text-center  w-1/5 font-semibold lg:text-sm sm:text-[0.5rem]">
                        SAR: {units.price}
                      </span>
                      {/* <br></br>
                      <div>
                        <h1>
                          Total Amount Paid:
                          {units.price}/-
                        </h1>
                      </div> */}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
