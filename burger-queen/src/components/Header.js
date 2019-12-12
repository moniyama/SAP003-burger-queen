import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  title: {
    color: "#BF190A",
    display: "flex",
    justifyContent: "center",
    padding: "1%"    
  }
});

const Header = () => <h1 className={css(styles.title)}>BURGUER QUEEN</h1>;

export default Header;
