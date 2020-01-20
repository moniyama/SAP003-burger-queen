import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Header() {
  return (
    <header className={css(styles.header)}>
      <figure>
        <img
          className={css(styles.logo)}
          src={require("../img/Capturar2.PNG")}
          alt={"logo"}
        ></img>
      </figure>
    </header>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "52%"
  },
  header: {
    backgroundColor: "white",
    textAlign: "center"
  }
});
