import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  button: {
    borderRadius:'5px',
    height: '70px',
    width: '180px',
    fontSize:'20px',
    marginBottom:'3%',
    padding:'1%',
    margin:'2%'
  }
});

const button = props => (
  <button className={css(styles.button)} onClick={props.handleClick}>
    {props.title}
  </button>
);

export default button;
