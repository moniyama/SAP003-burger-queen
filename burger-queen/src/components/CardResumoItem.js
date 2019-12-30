import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = StyleSheet.create({
  price: {
    alignSelf: "center"
  },
  qtdBox: {
    backgroundColor: "#F2B885",
    padding: "3% 6%",
    marginRight: "4%"
    // boxShadow: "inset 0 0px 7px",
  },
  listaItens: {
    display: "flex",
    justifyContent: "space-between"
  },
  itens: {
    display: "block",
    width: "100%",
    marginTop: "10px"
  },
  p: {
    margin: "0"
  },
  qtdBtn: {
    width: "40px",
    border: "0",
    borderRadius: "0",
    height: "40px",
    marginRight: "4%",
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
      <Button
        title={<DeleteIcon />}
        handleClick={() => props.handleClick(props.item, props.unitprice, null)}
        key={props.item + "delete"}
        class={styles.qtdBtn}
      />
    </section>
    <span className={css(styles.price)}>{props.price}</span>
  </section>
);

export default CardResumomItem;
