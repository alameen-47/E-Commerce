// BannerForm.js
import React from "react";
import Layout from "../../components/Layout/Layout";

const BannerForm = ({ handleSubmit, setBanner }) => {
  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center mb-2">
            <label
              style={{
                width: "50%",
                border: "1px Solid Black",
                padding: "0.2em",
                backgroundColor: " rgb(206, 205, 200)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Upload Banner
              <input
                type="file"
                name="banner"
                accept="image/*"
                onChange={(e) => setBanner(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Upload
          </button>
        </form>
      </Layout>
    </>
  );
};

export default BannerForm;
