import React from "react";
import Navbar from "./Navbar";
import "../../css/component.css";
import Footer from "./Footer";

const Layout = (prop) => {
  return (
    <div className="Layout">
      <input type="checkbox" id="sidebar_toggel" />
      <main className="main_content">
        <Navbar />
        {prop.children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
