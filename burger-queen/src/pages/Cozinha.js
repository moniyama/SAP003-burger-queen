import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import firebase from "../firebase/firebase-config";
import CardOrder from "../components/CardOrder";
import Historic from "../components/CardHistoric";

// filtrar historico de orders apenas do dia

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "0% 2% 2%",
    height: "78vh"
  },
  title: {
    color: "#BF190A",
    fontSize: "25px",
    fontWeight: "bold",
    margin: "1%"
  },
  orderSection: {
    height: "62%",
    overflow: "auto"
  },
  orderSectionHistory: {
    height: "38%",
    overflow: "auto"
  },
  ul: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    listStyleType: "none",
    overflow: "auto"
  }
});

const Kitchen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("ORDERS")
      .orderBy("time_ordered", "desc")
      .limit(20)
      .onSnapshot(querySnapshot => {
        const newOrders = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setOrders(newOrders);
      });
  }, []);

  // useEffect(() => {
  //   console.log("orders", orders);
  // }, [orders]);

  const saveOrderCooked = e => {
    console.log(e.currentTarget);
    const id = e.currentTarget.id;
    firebase
      .firestore()
      .collection("ORDERS")
      .doc(id)
      .update({
        order_status_cooked: true,
        time_conclude_order: new Date().toLocaleString("pt-BR")
      });
    const update = orders.map(order =>
      order.id === id ? { ...order, order_status_cooked: true } : order
    );
    setOrders(update);
  };

  return (
    <main className={css(styles.main)}>
      <header className={css(styles.title)}>PEDIDOS</header>
      <section className={css(styles.orderSection)}>
        <ul className={css(styles.ul)}>
          {orders
            .sort((a, b) => (a.time_ordered > b.time_ordered ? 1 : -1))
            .filter(element => element.order_status_cooked === false)
            .map((order, index) => (
              <CardOrder
                order={order}
                key={"CardOrderKitchen" + index}
                handleClick={saveOrderCooked}
                btntitle={"PEDIDO PRONTO"}
              />
            ))}
        </ul>
      </section>
      <header className={css(styles.title)}>PREPARADOS HOJE</header>
      <section className={css(styles.orderSectionHistory)}>
        <ul>
          {orders
            .filter(element => element.order_status_cooked === true)
            .sort((a, b) =>
              a.time_conclude_order > b.time_conclude_order ? -1 : 1
            )
            .map((order, index) => (
              <Historic
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
};
export default Kitchen;
