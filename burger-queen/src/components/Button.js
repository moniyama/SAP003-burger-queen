import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Button(props) {
  return (
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
}

const styles = StyleSheet.create({
  button: {
    borderRadius: "5px",
    outline: "none",
    marginBottom: "3%",
    padding: "1%",
    margin: "2%",
    ":active": {
      backgroundColor: "#F2B885"
    }
  }
});
