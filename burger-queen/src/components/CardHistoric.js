import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import Accordion from "react-bootstrap/Accordion";

// atualizar o historico de tempo de entrega

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

const Historic = props => {
  const [timeDiff, setTimeDiff] = useState(0);

  useEffect(() => {
    let concludeTime;
    props.page === "kitchen"
      ? (concludeTime = new Date(props.order.time_conclude_order).getTime())
      : (concludeTime = new Date(props.order.time_delivered_order).getTime());
    const orderedTime = new Date(props.order.time_ordered).getTime();
    const microSecondsDiff = Math.abs(concludeTime - orderedTime);
    const minDiff = Math.floor(microSecondsDiff / (1000 * 60));
    setTimeDiff(minDiff);
  }, [
    props.order.time_conclude_order,
    props.order.time_delivered_order,
    props.order.time_ordered,
    props.page
  ]);

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
          <div className={css(styles.historyUserTime)}>
            MESA {props.order.user_table} - {props.order.user_name}
          </div>
          <div className={css(styles.historyUserTime)}>
            <p>
              PEDIDO:{" "}
              {new Date(props.order.time_ordered).toLocaleString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit"
              })}
            </p>
            <p>
              PRONTO:{" "}
              {new Date(props.order.time_conclude_order).toLocaleString(
                "pt-BR",
                {
                  hour: "2-digit",
                  minute: "2-digit"
                }
              )}
            </p>
          </div>
          <div className={css(styles.historyTimeDiff)}>
            {props.page === "kitchen"
              ? "Tempo de preparação:"
              : "Tempo de atendimento"}{" "}
            {timeDiff} {timeDiff > 1 ? "minutos" : "minuto"}
          </div>
        </li>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.index}>
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
};

export default Historic;
