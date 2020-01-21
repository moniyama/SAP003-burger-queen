import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Footer(props) {
  return (
    <footer className={css(styles.footer, props.class)}>
      <p>Desenvolvido por MSAY </p>
    </footer>
  );
}

const styles = StyleSheet.create({
  footer: {
    fontSize: "20px",
    borderRadius: "5px",
    backgroundColor: "#F2B885",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    padding: "1%"
  }
});
