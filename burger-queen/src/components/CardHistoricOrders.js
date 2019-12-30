import React from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  history: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    padding:'1%'
  },
  colorOne: { backgroundColor: "gray" },
  colorTwo: { backgroundColor: "red" },
  historyUser: {},
  historyTime: {
    width: "50%"
  },
  historyTimeDiff: {
    width: "25%"
  },
  p: {
    margin: "0"
  }
});

const Historic = props => (
  <li
    key={props.index}
    className={css(
      styles.history,
      props.index % 2 ? styles.colorOne : styles.colorTwo
    )}
    onClick={props.handleClick}
  >
    <div className={css(props.index % 2 ? styles.colorOne : styles.colorTwo)}>
      MESA {props.obj.user_table} - {props.obj.user_name}
    </div>
    <div className={css(styles.historyTime)}>
      <p className={css(styles.p)}>PEDIDO: {"11:45"}</p>
      <p className={css(styles.p)}>PRONTO: {"12:00"}</p>
    </div>
    <div className={css(styles.historyTimeDiff)}>
      Tempo de preparo de: {"15 minutos"}
    </div>
  </li>
);

export default Historic;
