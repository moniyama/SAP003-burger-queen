import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import CardHistoric from "../components/CardHistoric";
import CardOrder from "../components/CardOrder";
import Header from "../components/Header";
import UpdateOrderFirebase from "../Utils/UpdateOrderFirebase";
import GetOrderFirebase from "../Utils/GetOrderFirebase";
import Footer from "../components/Footer";

export default function KitchenPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    GetOrderFirebase("Kitchen", setOrders);
  }, []);

  const saveOrder = e => {
    UpdateOrderFirebase(e, "Kitchen", orders, setOrders);
  };

  return (
    <>
      <Header />
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
              .sort((a, b) =>
                a.timestamp_cooked > b.timestamp_cooked ? -1 : 1
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
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "0% 2%",
    height: "83vh",
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
      height: "25vh"
    }
  }
});
