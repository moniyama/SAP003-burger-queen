import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";
import AddIcon from "@material-ui/icons/Add";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";

const styles = StyleSheet.create({
  price: {
    alignSelf: "center"
  },
  qtdBox: {
    backgroundColor: "#F2B885",
    padding: "3% 6%"
    // boxShadow: "inset 0 0px 7px",
  },
  listaItens: {
    display: "flex",
    justifyContent: "space-between"
  },
  itens: {
    display: "block",
    width: "100%",
    marginTop: "15px"
  },
  p: {
    margin: "0"
  },
  qtdBtn: {
    width: "50px",
    border: "0",
    borderRadius: "0",
    height: "40px",
    margin: "0 4% 0 0",
    padding: "0"
  }
});

const CardResumomItem = props => (
  <section className={css(styles.listaItens)}>
    <section className={css(styles.itens)}>
      <p className={css(styles.p)}>{props.item}</p>
      <Button
        title={<ExposureNeg1Icon />}
        handleClick={() => props.handleClick(props.item, props.unitprice, "-1")}
        key={props.item + "-1"}
        class={styles.qtdBtn}
      />
      <Button
        title={<ExposurePlus1Icon />}
        handleClick={() => props.handleClick(props.item, props.unitprice, "+1")}
        key={props.item + "+1"}
        class={styles.qtdBtn}
      />
      <span className={css(styles.qtdBox)}>{props.quantia}</span>
    </section>
    <span className={css(styles.price)}>{props.price}</span>
  </section>
);

export default CardResumomItem;
