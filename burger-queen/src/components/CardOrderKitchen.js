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

const CardOrderKitchen = props => (
  <li key={props.index} className={css(styles.orderCard)}>
    <header className={css(styles.headerCard)}>
      <div className={css(styles.orderedUser)}>
        <p>MESA {props.obj.user_table}</p>
        <p>{props.obj.user_name}</p>
      </div>
      <div className={css(styles.orderedTime)}>
        PEDIDO: 11:35
        {/* {console.log(props.obj.time_ordered)} */}
        {/* {obj.time_ordered.toDate().toLocaleString("pt-BR")} */}
      </div>
    </header>
    <section className={css(styles.bodyCard)}>
      <div className={css(styles.orderedItem)}>
        {props.obj.order.map((element, key) => {
          return <div key={key}>{element.item}</div>;
        })}
      </div>
    </section>
    <Button
      title={"PEDIDO PRONTO"}
      class={styles.btnFinishOrder}
      handleClick={props.handleClick}
      id={props.obj.id}
    />
  </li>
);

export default CardOrderKitchen;
