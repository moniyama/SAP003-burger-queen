import React from "react";
import Header from "./components/Header";
import NavTab from "./components/Nav-Tab";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  main: {
    margin: "2% 3%",
  }
});

export default function App() {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className={css(styles.main)}>
        <NavTab />
        <Footer />
      </div>
    </>
  );
}
