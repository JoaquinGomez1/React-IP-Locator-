import React from "react";

import Header from "./Header";
import "./layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header siteTitle={"IP Tracker"} />
      {children}
    </>
  );
};

export default Layout;
