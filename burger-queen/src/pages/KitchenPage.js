import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import CardHistoric from "../components/CardHistoric";
import CardOrder from "../components/CardOrder";
import UpdateOrderFirebase from "../Utils/UpdateOrderFirebase";
import GetOrderFirebase from "../Utils/GetOrderFirebase";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    GetOrderFirebase("Kitchen", setOrders);
  }, []);

  const saveOrder = e => {
    UpdateOrderFirebase(e, "Kitchen", orders, setOrders);
  };

  return (
    <main className={css(styles.main)}>
      <section className={css(styles.orderSection)}>
        <header className={css(styles.title)}>PEDIDOS A PREPARAR</header>
        <div className={css(styles.orders)}>
          <ul className={css(styles.ul)}>
            {orders
              .filter(element => element.order_status_cooked === false)
              .sort((a, b) =>
                a.timestamp_ordered > b.timestamp_ordered ? 1 : -1
              )
              .map((order, index) => (
                <CardOrder
                  order={order}
                  key={"CardOrderKitchen" + index}
                  handleClick={saveOrder}
                  btntitle={"PEDIDO PRONTO"}
                />
              ))}
          </ul>
        </div>
      </section>
      <section className={css(styles.orderSectionHistory)}>
        <header className={css(styles.title)}>
          ULTIMOS PEDIDOS PREPARADOS
        </header>
        <ul className={css(styles.ulHistory)}>
          {orders
            .filter(element => element.order_status_cooked === true)
            .sort((a, b) => (a.timestamp_cooked > b.timestamp_cooked ? -1 : 1))
            .map((order, index) => (
              <CardHistoric
                key={"Historic" + index}
                order={order}
                index={index}
                page={"kitchen"}
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
    height: "78vh"
  },
  title: {
    color: "#BF190A",
    fontSize: "25px",
    fontWeight: "bold",
    margin: "1%"
  },
  orderSection: {
    height: "65%"
  },
  orderSectionHistory: {
    height: "35%"
  },
  orders: {
    height: "92%",
    overflow: "auto"
  },
  ul: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    listStyleType: "none"
  },
  ulHistory: {
    overflow: "auto",
    height: "80%"
  }
});
