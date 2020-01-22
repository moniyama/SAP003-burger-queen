import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";
import { auth } from "../firebase/firebase-config";
import Image from "../components/Image";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export default function Header(props) {
  return (
    <header className={css(styles.header)}>
      <Image
        class={styles.logo}
        src={require("../img/Capturar2.PNG")}
        alt={"logo"}
      />
      <Button
        class={styles.btnLogout}
        title={<ExitToAppIcon />}
        handleClick={() => auth.signOut()}
      />
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
  btnLogout: {
    width: "10%"
  }
});
