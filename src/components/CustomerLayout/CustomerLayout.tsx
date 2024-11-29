import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import styles from "./CustomerLayout.module.css";

const CustomerLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.content}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default CustomerLayout;
