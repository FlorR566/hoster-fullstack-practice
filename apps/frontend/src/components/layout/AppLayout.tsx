import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Layout from "./Layout";

const AppLayout: React.FC = () => {
  return (
    <Layout className="flex">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </Layout>
  );
};

export default AppLayout;
