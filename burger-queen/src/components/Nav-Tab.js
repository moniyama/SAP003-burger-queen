import React from "react";
import { StyleSheet, css } from "aphrodite";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Menu from "../pages/Pedidos";
import Cozinha from '../pages/Cozinha'

// azul #99AABF
// verde #6E8C03
// laranja #F2913D
// laranja claro #F2B885
// vermelho #BF190A

const styles = StyleSheet.create({
  navbar: {
    fontSize: "large",
    borderRadius: "5px",
    backgroundColor: "#F2B885",
    // color: "red",
    // display: "flex"
    // justifyContent: "space-around",
    // flexGrow: 1
  },

  tabBox: {
    backgroundColor: "white",
    display: "flex",
    flexGrow: 1
  }
});

export default function navTab() {
  return (
    <Tabs className={css(styles.navbar)} transition={false} defaultActiveKey="pedidos" id="uncontrolled-tab-example">
  <Tab eventKey="pedidos" title="REALIZAR PEDIDO">
    <Menu />
  </Tab>
  <Tab eventKey="cozinha" title="EM PREPARAÇÃO">
    <Cozinha />
  </Tab>
  <Tab eventKey="pronto" title="PARA ENTREGA">
    asdfasfdasdfasdf
  </Tab>
</Tabs>
    // <Tabs
    //   className={css(styles.navbar)}
    //   defaultActiveKey="pedidos"
    //   transition={false}
    // >
    //   <Tab eventKey="pedidos" title="REALIZAR PEDIDO">
    //     <Menu />
    //   </Tab>
    //   <Tab
    //     className={css(styles.tabBox)}
    //     eventKey="cozinha"
    //     title="EM PREPARAÇÃO"
    //   >
    //     <Cozinha />
    //   </Tab>
    //   <Tab
    //     className={css(styles.tabBox)}
    //     eventKey="pronto"
    //     title="PARA ENTREGA"
    //   >
    //     asdfasdfads
    //   </Tab>
    // </Tabs>
  );
}
