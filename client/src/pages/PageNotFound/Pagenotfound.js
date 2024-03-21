import React from "react";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./Pagenotfound.css";

const Pagenotfound = () => {
  return (
    <>
      <Layout title={"Go Back-Page Not Found"}>
        <div className="pg-nt-fnd-container">
          <h1>404</h1>
          <h4>Page Not Found</h4>
          <Link to="/">
            <button>Go Back</button>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Pagenotfound;
