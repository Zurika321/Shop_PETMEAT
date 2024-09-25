import React from "react";
import HeaderUser from "./header/header";
import FooterUser from "./footer/footer";
import "./HomePage.css";
import { Outlet } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div>
      <HeaderUser />
      <Outlet />
      <FooterUser />
    </div>
  );
};

export default HomePage;
