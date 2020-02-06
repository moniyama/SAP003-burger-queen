import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import CardHistoric from "../components/CardHistoric";
import CardOrder from "../components/CardOrder";
import UpdateOrderFirebase from "../Utils/UpdateOrderFirebase";
import GetOrderFirebase from "../Utils/GetOrderFirebase";

export default function DeliveryPage() {
  const [deliveryOrders, setDeliveryOrders] = useState([]);

  useEffect(() => {
    GetOrderFirebase("Delivery", setDeliveryOrders);
  }, []);

  const saveOrderDelivered = e => {
    UpdateOrderFirebase(e, "Delivery", deliveryOrders, setDeliveryOrders);
  };

  return (
    <main className={css(styles.main)}>
      <section className={css(styles.orderSection)}>
        <header className={css(styles.title)}>PEDIDOS A ENTREGAR</header>
        <div className={css(styles.orders)}>
          <ul className={css(styles.ul)}>
            {deliveryOrders
              .sort((a, b) =>
                a.timestamp_cooked > b.timestamp_cooked ? 1 : -1
              )
              .filter(
                element =>
                  element.order_status_cooked === true &&
                  element.order_status_delivered === false
              )
              .map((order, index) => (
                <CardOrder
                  order={order}
                  key={"CardOrderDelivery" + index}
                  handleClick={saveOrderDelivered}
                  btntitle={"PEDIDO ENTREGUE"}
                />
              ))}
          </ul>
        </div>
      </section>
      <section className={css(styles.orderSectionHistory)}>
        <header className={css(styles.title)}>ULTIMOS PEDIDOS ENTREGUES</header>
        <ul className={css(styles.ulHistory)}>
          {deliveryOrders
            .filter(element => element.order_status_delivered === true)
            .sort((a, b) => (a.timestamp_cooked > b.timestamp_cooked ? -1 : 1))
            .map((order, index) => (
              <CardHistoric
                key={"HistoricDelivery" + index}
                order={order}
                index={index}
                page={"delivery"}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "0% 2%",
    height: "78vh",
    backgroundColor: "white",
    margin: "2% 3%",
    borderRadius: "5px"
  },
  title: {
    color: "#BF190A",
    fontSize: "25px",
    fontWeight: "bold",
    margin: "1%"
  },
  orderSection: {
    height: "65%",
    "@media (min-width: 800px)": {
      height: "48vh"
    }
  },
  orderSectionHistory: {
    height: "35%"
  },
  orders: {
    height: "92%",
    overflow: "auto",
    "@media (min-width: 800px)": {
      height: "40vh"
    }
  },
  ul: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    listStyleType: "none",
    margin: "0"
  },
  ulHistory: {
    overflow: "auto",
    height: "80%",
    "@media (min-width: 800px)": {
      height: "20vh"
    }
  }
});

