import React from "react";
import Header from "../components/Header";
import NavTab from "../components/Nav-Tab";
import Footer from "../components/Footer";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  main: {
    margin: "2% 3%"
  }
});

export default function Hall() {
  return (
    <>
      <Header />
      <div className={css(styles.main)}>
        <NavTab page={"hall"} />
        <Footer />
      </div>
    </>
  );
}
