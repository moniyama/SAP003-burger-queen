import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  input: {
    height: "30px",
    padding: "5%",
    margin: "2% 3%",
    width: "94%"
  }
});

const Input = props => (
  <input
    className={css(styles.input, props.class)}
    type={props.type}
    placeholder={props.placeholder}
    id={props.id}
    autoFocus={props.autofocus}
    onChange={props.onChange}
    name={props.name}
  />
);

export default Input;
