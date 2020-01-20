import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Footer() {
  return (
    <footer className={css(styles.footer)}>
      <p>Desenvolvido por MSAY </p>
    </footer>
  );
}

const styles = StyleSheet.create({
  footer: {
    fontSize: "large",
    borderRadius: "5px",
    backgroundColor: "#F2B885",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    padding: "1%",
    bottom: "0"
  }
});
