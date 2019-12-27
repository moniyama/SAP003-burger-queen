import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  button: {
    borderRadius: "5px",
    outline: "none",
    fontSize: "20px",
    marginBottom: "3%",
    padding: "1%",
    margin: "2%",
    ":active": {
      backgroundColor: "#F2B885"
    }
  }
});

const button = props => (
  <button
    value={props.value}
    title={props.title}
    className={css(styles.button, props.class)}
    onClick={props.handleClick}
    disabled={props.disabled}
    id={props.id}
  >
    {props.title} {props.value}
  </button>
);

export default button;
