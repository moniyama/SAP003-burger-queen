import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import firebase from "../firebase/firebase-config";
import CardOrder from "../components/CardOrder";
import Historic from "../components/CardHistoric";

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

  const saveOrderCooked = e => {
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
      <section className={css(styles.orderSection)}>
        <header className={css(styles.title)}>PEDIDOS A PREPARAR</header>
        <div className={css(styles.orders)}>
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
