import React from "react";
import Button from "./Button";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  orderCard: {
    width: "31%",
    backgroundColor: "#F2B885",
    margin: "1%",
    padding: "1%",
    borderRadius: "5px",
    display: "flex",
    flexWrap: "wrap"
  },
  headerCard: {
    display: "flex",
    width: "100%",
    paddingBottom: "2%",
    height: "fit-content"
  },
  orderedUser: {
    textAlign: "left",
    width: "65%"
  },
  orderedTime: {
    textAlign: "right",
    width: "35%"
  },

  bodyCard: {
    width: "100%",
    height: "110px",
    backgroundColor: "white",
    paddingLeft: "2%",
    overflow: "auto"
  },
  orderedItem: {
    width: "100%",
    textAlign: "left"
  },
  btnFinishOrder: {
    width: "90%",
    margin: "auto",
    marginTop: "3%"
  }
});

const CardOrder = props => (
  <li className={css(styles.orderCard)}>
    <header className={css(styles.headerCard)}>
      <div className={css(styles.orderedUser)}>
        <p>MESA {props.order.user_table}</p>
        <p>{props.order.user_name}</p>
      </div>
      <div className={css(styles.orderedTime)}>
        PEDIDO:{" "}
        {new Date(props.order.time_ordered).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit"
        })}
      </div>
    </header>
    <div className={css(styles.bodyCard)}>
      {props.order.order.map((itemOrdered, key) => (
        <div className={css(styles.orderedItem)} key={key + itemOrdered}>
          {itemOrdered.quantia}x {itemOrdered.item}
        </div>
      ))}
    </div>
    <Button
      title={props.btntitle}
      class={styles.btnFinishOrder}
      handleClick={props.handleClick}
      id={props.order.id}
    />
  </li>
);

export default CardOrder;
