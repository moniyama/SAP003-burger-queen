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
    fontWeight:'bold',
  },

  tabBox: {
    backgroundColor: "white",
  }
});

export default function navTab() {
  return (
    <Tabs className={css(styles.navbar)} transition={false} defaultActiveKey="pedidos" id="uncontrolled-tab-example">
  <Tab className={css(styles.tabBox)} eventKey="pedidos" title="REALIZAR PEDIDO">
    <Menu />
  </Tab>
  <Tab className={css(styles.tabBox)} eventKey="cozinha" title="EM PREPARAÇÃO">
    <Cozinha />
  </Tab>
  <Tab className={css(styles.tabBox)} eventKey="pronto" title="PARA ENTREGA">
    asdfasfdasdfasdf
  </Tab>
</Tabs>
  );
}
