import React from "react";
import { css } from "aphrodite";

export default function Input(props) {
  return (
    <input
      className={css(props.class)}
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
