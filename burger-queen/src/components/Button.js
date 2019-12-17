import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  button: {
    width: "100px",
    height:'100px'
  }
});

const button = props => (
  <button key={props.key} className={css(styles.button)} onClick={props.handleClick}>
    {props.title} R${props.value}
  </button>
);

export default button;
