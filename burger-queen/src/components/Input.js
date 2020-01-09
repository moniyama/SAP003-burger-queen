import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  input: {
    display:'block',
    width: '100%'
  }
})
const Input = props => (
  <>
    {/* <label for={props.id}></label> */}
    <input className={css(styles.input, props.class)} type={props.type} placeholder={props.placeholder} id={props.id} />
  </>
);

export default Input;
