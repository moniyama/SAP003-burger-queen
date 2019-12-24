import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  footer: {
    fontSize: "large",
    borderRadius: "5px",
    backgroundColor: "#F2B885",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    margin: "0px",
    bottom: "0"
  }
});

export default function Footer() {
  return (
    <footer className={css(styles.footer)}>
      <p>Desenvolvido por MSAY </p>
    </footer>
  );
}
