import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import firebase from "../firebase/firebase-config";
import Button from "../components/Button";
// import CardOrderKitchen from "../components/CardOrderKitchen";

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "3%",
    height: "83vh"
  },
  title: {
    color: "#BF190A",
    fontSize: "25px",
    fontWeight: "bold"
  },
  ul: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    listStyleType: "none"
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  },
  item: {
    width: "48%",
    backgroundColor: "#F2B885",
    margin: "1%",
    padding: "1%",
    borderRadius: "5px"
  },
  orderedTime: {
    textAlign: "right",
    width: "50%"
  },
  btnFinishOrder: {
    width: "90%",
    bottom: "0px"
  }
});

const Kitchen = () => {
  const [orders, setOrders] = useState([]);
  const [historyOrders, setHystoryOrders] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("ORDERS")
      .where("order_status_cooked", "==", false)
      .orderBy("time_ordered", "asc")
      .limit(4)
      .get()
      .then(querySnapshot => {
        const newOrders = querySnapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        setOrders(newOrders);
      });
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  const concludeOrder = e => {
    const id = e.currentTarget.id;
    console.log(id);
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
      <header className={css(styles.title)}>
        <p>PEDIDOS REALIZADOS</p>
      </header>
      <section>
        <ul className={css(styles.ul)}>
          {orders.map((obj, index) => {
            return (
              <li key={index} className={css(styles.item)}>
                <section className={css(styles.header)}>
                  <div>
                    MESA {obj.user_table} {obj.user_name}{" "}
                  </div>
                  <div className={css(styles.orderedTime)}>
                    PEDIDO {obj.time_ordered.toDate().toLocaleString("pt-BR")}
                  </div>
                </section>
                <div>
                  {obj.order.map((element, key) => {
                    return <div key={key}>{element.item}</div>;
                  })}
                </div>
                <Button
                  title={"CONCLUIDO"}
                  class={styles.btnFinishOrder}
                  handleClick={concludeOrder}
                  id={obj.id}
                />
              </li>
            );
          })}
        </ul>
      </section>
      <section>histórico</section>
    </main>
  );
};
export default Kitchen;
