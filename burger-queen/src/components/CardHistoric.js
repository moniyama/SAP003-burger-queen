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
    display: "block",
    backgroundColor: "#DDDDDD"
  }
});

const Historic = props => (
  <Accordion defaultActiveKey="none">
    <Accordion.Toggle eventKey={props.index} className={css(styles.accordion)}>
      <li
        key={props.index}
        className={css(
          styles.history,
          props.index % 2 ? styles.colorOne : styles.colorTwo
        )}
      >
        <div className={css(styles.historyUserTime)}>
          MESA {props.order.user_table} - {props.order.user_name}
        </div>
        <div className={css(styles.historyUserTime)}>
          <p>
            PEDIDO:
            {props.order.time_ordered.toDate().toLocaleString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </p>
          <p>
            PRONTO:
            {"12:00:12"}
            {/* {props.order.time_conclude_order.toDate().toLocaleString("pt-BR")} */}
          </p>
        </div>
        <div className={css(styles.historyTimeDiff)}>
          Tempo de preparo de:
          {"15 minutos"}
          {/* {(props.order.time_conclude_order.toDate().getTime()- props.order.time_ordered.toDate().getTime()).toLocaleString("pt-BR")} */}
        </div>
      </li>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey={props.index}>
      <section className={css(styles.show)}>
        {props.order.order.map((itemOrdered, index) => {
          return <li key={"historyDetails" + index}> {itemOrdered.item}</li>;
        })}
      </section>
    </Accordion.Collapse>
  </Accordion>
);

export default Historic;
