import React from "react";
import { ToggleOffOutlined, ToggleOn, Height } from "@material-ui/icons";
import changeToggleIcon from "../Utils/changeToggleIcon";
import { css, StyleSheet } from "aphrodite";

export default function ToggleIcon(props) {
  return (
    <>
      <div className={css(styles.toggle)}>
        <>{props.title}</>
        <>
          {props.state ? (
            <ToggleOn
              className={css(styles.toggleSize)}
              title={props.title}
              onClick={e => changeToggleIcon(e, { ...props })}
            />
          ) : (
            <ToggleOffOutlined
              className={css(styles.toggleSize)}
              title={props.title}
              onClick={e => changeToggleIcon(e, { ...props })}
            />
          )}
        </>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  toggleSize: {
    transform: "scale(2)"
  },
  toggle: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "2%",
    width: "30%"
  }
});
