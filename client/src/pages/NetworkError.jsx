import { Button, Result } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import Layout from "../components/Layout/Layout";

export const NetworkError = () => {
  return (
    <Layout>
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <NavLink to="/signin">
            <Button type="primary">GO BACK</Button>
          </NavLink>
        }
      />
    </Layout>
  );
};
