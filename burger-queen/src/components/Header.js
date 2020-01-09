import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  logo:{
    width:'70%'
  },
  header: {
    backgroundColor:'white',
    textAlign:'center',
    width:'100vw',
  }
});

export default function Header() {
  return (
    <header className={css(styles.header)}>
      <figure>
        <img className={css(styles.logo)} src={require("../img/Capturar.PNG")} alt={"logo"}></img>
      </figure>
    </header>
  );
}
