import React from "react";
import { css, StyleSheet } from "aphrodite";

export default function Image(props) {
  return (
    <figure className={css(styles.img)}>
      <img
        className={css(props.class)}
        src={props.src}
        alt={props.alt}
      ></img>
    </figure>
  );
}

const styles = StyleSheet.create({
  img: {
    textAlign: "center",
    margin:'0'
  }
});
