import React from "react";
import Layout from "../../components/Layout/Layout";
import "./Pagenotfound.css";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <>
      <Layout title={"Go Back-Page Not Found"}>
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <NavLink to="/signin">
              <Button type="primary">GO BACK</Button>
            </NavLink>
          }
        />
      </Layout>
    </>
  );
};

export default Pagenotfound;
