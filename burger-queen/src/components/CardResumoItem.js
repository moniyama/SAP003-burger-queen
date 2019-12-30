import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = StyleSheet.create({
  price: {
    textAlign: "right",
    width: "30%"
  },
  qtdBox: {
    border: "solid #F2B885",
    marginRight: "2%",
    background: "white",
    width: "40px",
    height: "40px"
  },
  listaItens: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px"
  },
  itens: {
    display: "block",
    width: "100%"
  },
  qtdBtn: {
    width: "40px",
    height: "40px"
  },
  btns: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  grow: {
    width: "40px",
    height: "40px",
    alignSelf: "center"
  },
  btnsfirst: {
    display: "flex",
    alignSelf: "center"
  }
});

const CardResumomItem = props => (
  <li className={css(styles.listaItens)}>
    <div className={css(styles.itens)}>
      <p className={css(styles.p)}>{props.item}</p>
      <div className={css(styles.btns)}>
        <div className={css(styles.btnsfirst)}>
          <Button
            title={"-1"}
            handleClick={() =>
              props.handleClick(props.item, props.unitprice, "-1")
            }
            key={props.item + "-1"}
            class={styles.qtdBtn}
          />
          <Button
            title={props.quantia}
            key={"qtd-" + props.index}
            class={styles.qtdBox}
            disabled={true}
          />
          <Button
            title={"+1"}
            handleClick={() =>
              props.handleClick(props.item, props.unitprice, "+1")
            }
            key={props.item + "+1"}
            class={styles.qtdBtn}
          />
        </div>
        <div>
          <Button
            title={<DeleteIcon />}
            handleClick={() =>
              props.handleClick(props.item, props.unitprice, null)
            }
            key={props.item + "delete"}
            class={styles.qtdBtn}
          />
        </div>
      </div>
    </div>
    <div className={css(styles.price)}>
      <p>{props.price}</p>
    </div>
  </li>
);

export default CardResumomItem;
