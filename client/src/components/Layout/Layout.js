import React from "react";
import Footer from "./Footer/Footer.js";
import Header from "./Header/Header.jsx";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>
        <Toaster />
        {children}
      </main>

      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "Rawad Mall-Shop Now!",
  description: "Rawad Mall Shopping site",
  keywords: "mern,react,node,mongodb",
  author: "Al Ameen",
};
export default Layout;
