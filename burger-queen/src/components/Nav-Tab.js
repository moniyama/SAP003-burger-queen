import React from "react";
import { StyleSheet, css } from "aphrodite";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Menu from "../pages/Pedidos";

// azul #99AABF
// verde #6E8C03
// laranja #F2913D
// laranja claro #F2B885
// vermelho #BF190A

const styles = StyleSheet.create({
  navbar: {
    borderRadius: "5px",
    backgroundColor: "#F2B885",
    color: "black"
    // display: "flex",
    // justifyContent: "space-around",
    // flexGrow: 1
  },
  tabBox: {
    backgroundColor: "white"
    // flexGrow: 1
  }
});

const navTab = () => (
  <Tabs className={css(styles.navbar)} defaultActiveKey="menu">
    <Tab
      className={css(styles.tabBox)}
      eventKey="pedidos"
      title="REALIZAR PEDIDO"
    >
      <Menu />
    </Tab>
    <Tab
      className={css(styles.tabBox)}
      eventKey="cozinha"
      title="EM PREPARAÇÃO"
    >
      cozinha
    </Tab>
    <Tab className={css(styles.tabBox)} eventKey="pronto" title="PARA ENTREGA">
      ENTREGA
    </Tab>
  </Tabs>
);

export default navTab;
