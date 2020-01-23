import React from "react";
import { StyleSheet, css } from "aphrodite";
import CardResumomItem from "./CardResumoItem";

export default function Resumo(props) {
  const shortcutQtd = (item, unitprice, plusOrMinus) => {

    const updatedItem = props.resumo
      .filter(obj => obj.item === item)
      .map(element => {
        if (plusOrMinus === "+1")
          return {
            item,
            quantity: element.quantity + 1,
            value: element.value + unitprice,
            unitPrice: unitprice
          };
        else if (element.quantity > 1 && plusOrMinus !== null)
          return {
            item,
            quantity: element.quantity - 1,
            value: element.value - unitprice,
            unitPrice: unitprice
          };
        else return null;
      });

    const newResumo = props.resumo.map(obj =>
      obj.item === item ? updatedItem[0] : obj
    );
    props.setresumo(newResumo.filter(elem => elem !== null));
  };

  return (
    <>
      <header>
        <h4>Resumo</h4>
        <div className={css(styles.title)}>
          <span>Item</span>
          <span>R$</span>
        </div>
      </header>
      <div className={css(styles.resumoItens)}>
        <ul className={css(styles.ul)}>
          {props.resumo.map((itemResumo, index) => (
            <CardResumomItem
              item={itemResumo.item}
              quantity={itemResumo.quantity}
              price={itemResumo.value + ",00"}
              unitprice={itemResumo.unitPrice}
              handleClick={shortcutQtd}
              key={"CardResumomItem" + index}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

const styles = StyleSheet.create({
  ul: {
    listStyleType: "none"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    fontWeight: "bold",
    paddingLeft: "2%",
    fontSize: "25px"
  },
  resumoItens: {
    overflow: "auto",
    flexGrow: "1",
    paddingLeft: "2%",
    fontSize: "20px",
    textAlign: "left"
  }
});
