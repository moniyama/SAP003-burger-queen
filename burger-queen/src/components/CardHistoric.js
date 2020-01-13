import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import Accordion from "react-bootstrap/Accordion";
import HourFormate from "./Date.js";

export default function CardHistoric(props) {
  const [timeDiff, setTimeDiff] = useState(0);
  const [endTime, setEndTime] = useState("");
  const [initialTime, setInicialTime] = useState("");

  const page = props.page;
  const index = props.index;

  useEffect(() => {
    setInicialTime(new Date(props.order.timestamp_ordered).getTime());
    page === "kitchen"
      ? setEndTime(new Date(props.order.timestamp_cooked).getTime())
      : setEndTime(new Date(props.order.timestamp_delivered).getTime());
    const microSecondsDiff = Math.abs(endTime - initialTime);
    const minDiff = Math.round(microSecondsDiff / (1000 * 60));
    setTimeDiff(minDiff);
  }, [
    endTime,
    initialTime,
    page,
    props.order.timestamp_cooked,
    props.order.timestamp_delivered,
    props.order.timestamp_ordered
  ]);

  return (
    <Accordion defaultActiveKey="none">
      <Accordion.Toggle eventKey={index} className={css(styles.accordion)}>
        <li
          key={index}
          className={css(
            styles.history,
            index % 2 ? styles.colorOne : styles.colorTwo
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
            {page === "kitchen"
              ? "Tempo de preparação:"
              : "Tempo de atendimento"}
            <div>
              {timeDiff} {timeDiff > 1 ? "minutos" : "minuto"}
            </div>
          </div>
        </li>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={index}>
        <section className={css(styles.show)}>
          {props.order.order.map((itemOrdered, index) => (
            <li key={"historyDetails" + index}>
              {itemOrdered.quantia}x {itemOrdered.item}
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
