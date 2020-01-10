import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import { StyleSheet, css } from "aphrodite";
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

const DeliveryPage = () => {
  const [deliveryOrders, setDeliveryOrders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("ORDERS")
      .where("order_status_cooked", "==", true)
      .onSnapshot(querySnapshot => {
        const newOrder = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setDeliveryOrders(newOrder);
      });
  }, []);

  const saveOrderCooked = e => {
    const id = e.currentTarget.id;
    firebase
      .firestore()
      .collection("ORDERS")
      .doc(id)
      .update({
        order_status_delivered: true,
        time_delivered_order: new Date().toLocaleString("pt-BR")
      });
    const update = deliveryOrders.map(order =>
      order.id === id ? { ...order, order_status_delivered: true } : order
    );
    setDeliveryOrders(update);
  };

  return (
    <main className={css(styles.main)}>
      <section className={css(styles.orderSection)}>
        <header className={css(styles.title)}>PEDIDOS A ENTREGAR</header>
        <div className={css(styles.orders)}>
          <ul className={css(styles.ul)}>
            {deliveryOrders
              .sort((a, b) =>
                a.time_conclude_order > b.time_conclude_order ? 1 : -1
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
                  handleClick={saveOrderCooked}
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
            .sort((a, b) =>
              a.time_conclude_order > b.time_conclude_order ? -1 : 1
            )
            .map((order, index) => (
              <Historic
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
};

export default DeliveryPage;
