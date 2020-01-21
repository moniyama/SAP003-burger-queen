import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";
import { auth } from "../firebase/firebase-config";

export default function Header(props) {
  return (
    <header className={css(styles.header)}>
      <figure>
        <img
          className={css(styles.logo)}
          src={require("../img/Capturar2.PNG")}
          alt={"logo"}
        ></img>
      </figure>
      <Button title={"Sair"} handleClick={() => auth.signOut()} />
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
