import React from "react";
import Layout from "../../../components/Layout/Layout";
import "./Dashboard.css";
// import UserMenu from "../../../components/Layout/UserMenu/UserMenu";
import { useAuth } from "../../../context/auth";
import { t } from "i18next";
import { UserMenu } from "../../../components/Layout/UserMenu.jsx";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Rawad Mall"}>
      <div class="bg-white flex  lg:flex-row sm:flex-col rounded shadow-lg  px-4 md:p-8  ">
        <UserMenu />
        <div class="bg-white lg:w-screen shadow rounded-tr-lg rounded-br-lg border">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="sm:text-lg lg:text-2xl leading-6 font-medium text-gray-900">
              {t("account.User Profile")}
            </h3>
          </div>
          <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-2 lg:grid-cols-6 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  {t("account.Full name")}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth?.user?.name}
                </dd>
              </div>
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-2 lg:grid-cols-6 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  {t("account.Email address")}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth?.user?.email}
                </dd>
              </div>
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-2 lg:grid-cols-6 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  {t("account.Phone number")}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth?.user?.phone}
                </dd>
              </div>
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-2 lg:grid-cols-6 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  {t("account.Address")}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth?.user?.address}
                </dd>
              </div>
              <div class="py-3 sm:py-5 sm:grid sm:grid-cols-2 lg:grid-cols-6 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  {t("account.Zip Code")}
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {auth?.user?.zipCode}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
