import React from "react";
import { StyleSheet, css } from "aphrodite";
import Accordion from "react-bootstrap/Accordion";

const styles = StyleSheet.create({
  accordion: {
    width: "100%",
    border: "none"
  },
  history: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1%"
  },
  colorOne: {
    backgroundColor: "white"
  },
  colorTwo: {
    backgroundColor: "#F2B885"
  },
  historyUserTime: {
    width: "35%",
    textAlign: "left"
  },
  historyTimeDiff: {
    width: "25%"
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
        <div className={css(styles.historyUserTime)}>
          MESA {props.obj.user_table} - {props.obj.user_name}
        </div>
        <div className={css(styles.historyUserTime)}>
          <p>
            PEDIDO: {"11:45:12"}
            {/* {props.obj.time_ordered.toDate().toLocaleString("pt-BR")} */}
          </p>
          <p>
            PRONTO:{"12:00:12"}
            {/* {props.obj.time_conclude_order.toDate().toLocaleString("pt-BR")} */}
          </p>
        </div>
        <div className={css(styles.historyTimeDiff)}>
          Tempo de preparo de:
          {"15 minutos"}
          {/* {(props.obj.time_conclude_order.toDate().getTime()- props.obj.time_ordered.toDate().getTime()).toLocaleString("pt-BR")} */}
        </div>
      </li>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={props.index}>
      <section className={css(styles.show)}>
        {props.obj.order.map((element, index) => {
          return <li key={"historyDetails" + index}> {element.item}</li>;
        })}
      </section>
    </Accordion.Collapse>
  </Accordion>
);

export default Historic;
