import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  button: {
    width: "100px",
    height: "70px"
  }
});

const button = props => (
  <button className={css(styles.button)} onClick={props.handleClick}>
    {props.title}
  </button>
);

export default button;
