import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";
import { auth } from "../firebase/firebase-config";
import Image from "../components/Image";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Header() {
  return (
    <header className={css(styles.header)}>
      <Image
        class={styles.logo}
        src={require("../img/Capturar2.PNG")}
        alt={"logo"}
      />
      <div className={css(styles.logout)}>
        <p>SAIR</p>
        <Button
          class={styles.btnLogout}
          title={<ExitToAppIcon />}
          handleClick={() => auth.signOut()}
        />
      </div>
    </header>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "52%"
  },
  header: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "space-evenly"
  },
  logout: {
    width: "20%",
    textAlign:'center',
  },
  btnLogout: {
    width: "70%",
    height: "60%"
  }
});
