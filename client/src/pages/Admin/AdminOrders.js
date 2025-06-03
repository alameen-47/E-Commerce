import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/orders/all-orders");
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(`/api/v1/orders/orders-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  console.log("{{{{{{{{{{{{{{{{{", orders, "}}}}}}}}}}}}}}}}");

  return (
    <Layout title="All Orders">
      <div className="flex lg:flex-row sm:flex-col lg:gap-10">
        <AdminMenu />

        <div className=" w-full h-screen overflow-y-scroll shadow rounded-lg border px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">All Orders</h2>

          {orders?.map((o, i) => (
            <div
              key={o._id}
              tabIndex={0}
              className="collapse collapse-arrow bg-white border border-base-300 rounded-box mb-4 shadow-xl"
            >
              {/* Order Header */}
              <div className="collapse-title font-medium flex flex-col lg:flex-row justify-between gap-2 text-sm lg:text-base">
                <div>#{i + 1}</div>
                <div>
                  <strong>Status:</strong>{" "}
                  <Select
                    bordered={false}
                    onChange={(value) => handleChange(o._id, value)}
                    defaultValue={o?.status}
                    className="min-w-[120px]"
                  >
                    {status.map((s, idx) => (
                      <Option key={idx} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <strong>Buyer:</strong>
                  {o?.buyer.name ? o?.buyer.name : o?.buyer.email}
                </div>
                <div>
                  <strong>Ordered:</strong> {moment(o?.createdAt).fromNow()}
                </div>
              </div>

              {/* Product Details */}
              <div className="collapse-content text-sm">
                <div>
                  <strong>Payment:</strong>{" "}
                  {o?.payment?.success ? "Success" : "Failed"}
                </div>
                <div>
                  <strong>Qty:</strong> {o?.products?.length}
                </div>
                {o?.products?.map((units) => {
                  const imageList =
                    units?.product?.images?.flatMap((imageObj) =>
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
                    ) || [];

                  return (
                    <div
                      key={units._id}
                      className="flex flex-col md:flex-row items-start gap-4 border-b py-4 sm:justify-start sm:"
                    >
                      {imageList
                        .filter((img) => img.src)
                        .slice(0, 1)
                        .map((img, idx) => (
                          <div
                            key={idx}
                            className="w-full md:w-32 h-auto bg-white rounded-lg overflow-hidden"
                          >
                            <img
                              src={img.src}
                              alt="Product"
                              className="object-contain w-full max-h-32"
                            />
                          </div>
                        ))}

                      <div className="flex flex-col">
                        <p className="font-bold text-base">
                          Name: {units?.product?.name}
                        </p>
                        <p className="font-bold text-base">
                          Size: {units?.size}
                        </p>
                        <div className="text-black font-bold text-base flex-row            items-center text-center  flex">
                          Color:
                          <div
                            style={{ backgroundColor: units.color }}
                            className={`w-4 h-4  border-2 rounded-md border-black/50  ml-1`}
                          />
                        </div>
                        <div className="text-black font-bold text-base flex-row            items-center text-center  flex">
                          Price: {units.price}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
