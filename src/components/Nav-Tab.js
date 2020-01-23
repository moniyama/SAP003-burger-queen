import React from "react";
import { StyleSheet, css } from "aphrodite";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import MenuPage from "../pages/MenuPage";
import KitchenPage from "../pages/KitchenPage";
import DeliveryPage from "../pages/DeliveryPage";

export default function NavTab(props) {
  return (
    <>
      {props.page === "kitchen" ? (
        <Tabs
          className={css(styles.navbar)}
          transition={false}
          defaultActiveKey="kitchen"
          id="uncontrolled-tab-example"
        >
          <Tab
            className={css(styles.tabBox)}
            eventKey="kitchen"
            title="COZINHA"
          >
            <KitchenPage />
          </Tab>
        </Tabs>
      ) : (
        <Tabs
          className={css(styles.navbar)}
          transition={false}
          defaultActiveKey="pedidos"
          id="uncontrolled-tab-example"
        >
          <Tab
            className={css(styles.tabBox)}
            eventKey="pedidos"
            title="MENU PEDIDOS"
          >
            <MenuPage />
          </Tab>
          <Tab
            className={css(styles.tabBox)}
            eventKey="pronto"
            title="EM ENTREGA"
          >
            <DeliveryPage />
          </Tab>
        </Tabs>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    fontSize: "25px",
    borderRadius: "8px",
    backgroundColor: "#F2B885",
    fontWeight: "bold",
    justifyContent: "space-evenly"
  },

  tabBox: {
    backgroundColor: "white"
  }
});


