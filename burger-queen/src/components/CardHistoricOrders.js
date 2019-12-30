import React from "react";
import { StyleSheet, css } from "aphrodite";
import Accordion from "react-bootstrap/Accordion";

const styles = StyleSheet.create({
  accordion: {
    width: "100%"
  },
  history: {
    display: "flex",
    justifyContent: "space-between",
    // width: "100%",
    padding: "1%"
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
  },
  show: {
    display: "block"
  }
});

const Historic = props => (
  <Accordion>
    <Accordion.Toggle eventKey={props.index} className={css(styles.accordion)}>
      <li
        key={props.index.uniqueId}
        className={css(
          styles.history,
          props.index % 2 ? styles.colorOne : styles.colorTwo
        )}
      >
        <div
          className={css(props.index % 2 ? styles.colorOne : styles.colorTwo)}
        >
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
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={props.index}>
      <section className={css(styles.show)}>
        {props.obj.order.map((element, index) => {
          return <li key={'historyDetails'+index}> {element.item}</li>;
        })}
      </section>
    </Accordion.Collapse>
  </Accordion>
);

export default Historic;
