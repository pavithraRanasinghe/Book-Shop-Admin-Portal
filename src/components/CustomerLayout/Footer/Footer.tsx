import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} E-Book. All rights reserved.</p>
      <p>
        <a href="/privacy">Privacy Policy</a> |{" "}
        <a href="/terms">Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
