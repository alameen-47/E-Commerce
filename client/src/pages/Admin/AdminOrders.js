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
      await axios.put(`/api/v1/auth/orders-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Orders">
      <div className="flex lg:flex-row sm:flex-col lg:gap-10">
        <AdminMenu />

        <div className="bg-slate-300 w-full h-screen overflow-y-scroll shadow rounded-lg border px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

          {orders?.map((o, i) => (
            <div
              key={o._id}
              tabIndex={0}
              className="collapse collapse-arrow bg-white border border-base-300 rounded-box mb-4"
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
                  <strong>Buyer:</strong> {o?.name}
                </div>
                <div>
                  <strong>Ordered:</strong> {moment(o?.createdAt).fromNow()}
                </div>
                <div>
                  <strong>Payment:</strong>{" "}
                  {o?.payment?.success ? "Success" : "Failed"}
                </div>
                <div>
                  <strong>Qty:</strong> {o?.products?.length}
                </div>
              </div>

              {/* Product Details */}
              <div className="collapse-content text-sm">
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
                      className="flex flex-col md:flex-row items-start gap-4 border-b py-4"
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
                        <h3 className="font-bold text-base">{units.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {units.description?.substring(0, 100)}
                        </p>
                        <p className="font-semibold mt-1">SAR: {units.price}</p>
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
