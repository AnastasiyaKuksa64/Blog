import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useAppSelector } from "../app/hooks";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  const DarkTheme = useAppSelector((state) => state.Theme);
  return (
    <div className={DarkTheme ? "dark" : "light"}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
