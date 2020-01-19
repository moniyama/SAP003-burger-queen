import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import {db} from "../firebase/firebase-config";
import CardHistoric from "../components/CardHistoric";
import CardOrder from "../components/CardOrder";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    db.collection("ORDERS")
      .orderBy("timestamp_ordered", "desc")
      .limit(20)
      .onSnapshot(querySnapshot => {
        const newOrders = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setOrders(newOrders);
      });
  }, []);

  const saveOrderCooked = e => {
    const id = e.currentTarget.id;
    db.collection("ORDERS")
      .doc(id)
      .update({
        order_status_cooked: true,
        timestamp_cooked: new Date().getTime(),
      });
    const update = orders.map(order =>
      order.id === id ? { ...order, order_status_cooked: true } : order
    );
    setOrders(update);
  };

  return (
    <main className={css(styles.main)}>
      <section className={css(styles.orderSection)}>
        <header className={css(styles.title)}>PEDIDOS A PREPARAR</header>
        <div className={css(styles.orders)}>
          <ul className={css(styles.ul)}>
            {orders
              .filter(element => element.order_status_cooked === false)
              .sort((a, b) => (a.timestamp_ordered > b.timestamp_ordered ? 1 : -1))
              .map((order, index) => (
                <CardOrder
                  order={order}
                  key={"CardOrderKitchen" + index}
                  handleClick={saveOrderCooked}
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
            .sort((a, b) =>
              a.timestamp_cooked> b.timestamp_cooked ? -1 : 1
            )
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
