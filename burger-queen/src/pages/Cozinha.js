import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import firebase from "../firebase/firebase-config";
import CardOrderKitchen from "../components/CardOrderKitchen";
import Historic from "../components/CardHistoricOrders";

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "0% 2%",
    height: "83vh"
  },
  title: {
    color: "#BF190A",
    fontSize: "25px",
    fontWeight: "bold",
    margin: "1%"
  },
  orderSection: {
    height: "50%",
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
      .onSnapshot(querySnapshot => {
        const newOrders = querySnapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        setOrders(newOrders);
      });
  }, []);

  useEffect(() => {
    console.log("orders", orders);
  }, [orders]);

  const concludeOrder = e => {
    const id = e.currentTarget.id;
    firebase
      .firestore()
      .collection("ORDERS")
      .doc(id)
      .update({
        order_status_cooked: true,
        time_conclude_order: firebase.firestore.FieldValue.serverTimestamp()
      });
    const update = orders.map(obj => {
      return obj.id === id ? { ...obj, order_status_cooked: true } : obj;
    });
    setOrders(update);
  };

  return (
    <main className={css(styles.main)}>
      <header className={css(styles.title)}>PEDIDOS REALIZADOS</header>
      <section className={css(styles.orderSection)}>
        <ul className={css(styles.ul)}>
          {orders
            .sort((a, b) => {
              return a.time_ordered > b.time_ordered ? 1 : -1;
            })
            .filter(element => {
              return element.order_status_cooked === false;
            })
            .map((obj, index) => {
              return (
                <CardOrderKitchen
                  obj={obj}
                  index={index}
                  handleClick={concludeOrder}
                />
              );
            })}
        </ul>
      </section>
      <header className={css(styles.title)}>HISTORICO</header>
      <section className={css(styles.orderSection)}>
        <ul>
          {orders
            .filter(element => {
              return element.order_status_cooked === true;
            })
            .sort((a, b) => {
              return a.time_conclude_order > b.time_conclude_order ? -1 : 1;
            })
            .map((obj, index) => {
              return (
                <Historic
                  index={index}
                  obj={obj}
                  handleClick={() => console.log("click")}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
};
export default Kitchen;
