import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  button: {
    borderRadius: "5px",
    
    fontSize: "20px",
    marginBottom: "3%",
    padding: "1%",
    margin: "2%"
  }
});

const button = props => (
  <button 
    value={props.value}
    title={props.title}
    className={css(styles.button, props.class)}
    onClick={props.handleClick}
    disabled={props.disabled}
  >
    {props.title} {props.value}
  </button>
);

export default button;
