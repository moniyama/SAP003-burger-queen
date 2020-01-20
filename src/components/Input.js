import React from "react";
import { StyleSheet, css } from "aphrodite";

export default function Input(props) {
  return (
    <input
      className={css(styles.input, props.class)}
      type={props.type}
      placeholder={props.placeholder}
      id={props.id}
      autoFocus={props.autofocus}
      onChange={props.onChange}
      name={props.name}
      value={props.value}
      checked={props.checked}
      autoComplete={props.autoComplete}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: "30px",
    padding: "5%",
    margin: "2% 3%",
    width: "94%"
  }
});