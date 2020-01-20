import React from "react";
import { StyleSheet, css } from "aphrodite";
import Accordion from "react-bootstrap/Accordion";
import HourFormate from "../Utils/HourFormate";
import TimeDiff from "../Utils/TimeDiff";

export default function CardHistoric(props) {
  return (
    <Accordion defaultActiveKey="none">
      <Accordion.Toggle
        eventKey={props.index}
        className={css(styles.accordion)}
      >
        <li
          key={props.index}
          className={css(
            styles.history,
            props.index % 2 ? styles.colorOne : styles.colorTwo
          )}
        >
          <div className={css(styles.historyUserAndTime)}>
            MESA {props.order.user_table} - {props.order.user_name}
          </div>
          <div className={css(styles.historyUserAndTime)}>
            <HourFormate
              title={"PEDIDO"}
              time={props.order.timestamp_ordered}
            />
            <HourFormate title={"PRONTO"} time={props.order.timestamp_cooked} />
            {props.page === "delivery" ? (
              <HourFormate
                title={"ENTREGUE"}
                time={props.order.timestamp_delivered}
              />
            ) : (
              ``
            )}
          </div>
          <div className={css(styles.historyTimeDiff)}>
            {props.page === "kitchen"
              ? "Tempo de preparação:"
              : "Tempo de atendimento"}
            <TimeDiff
              page={props.page}
              timeOrdered={props.order.timestamp_ordered}
              timeCooked={props.order.timestamp_cooked}
              timeDelivered={props.order.timestamp_delivered}
            />
          </div>
        </li>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.index}>
        <section className={css(styles.show)}>
          {props.order.order.map((itemOrdered, index) => (
            <li key={"historyDetails" + index}>
              {itemOrdered.quantity}x {itemOrdered.item}
            </li>
          ))}
        </section>
      </Accordion.Collapse>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  accordion: {
    width: "100%",
    border: "none",
    outline: "none"
  },
  history: {
    display: "flex",
    justifyContent: "space-between",
    padding: "1%",
    alignItems: "center"
  },
  colorOne: {
    backgroundColor: "white"
  },
  colorTwo: {
    backgroundColor: "#F2B885"
  },
  historyUserAndTime: {
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
