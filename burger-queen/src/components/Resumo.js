import React from "react";
import { StyleSheet, css } from "aphrodite";
import CardResumomItem from "./CardResumoItem";

const styles = StyleSheet.create({
  red: {
    backgroundColor: "#BF190A"
  },
  ul: {
    listStyleType: "none"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    fontWeight: "bold",
    padding: "0px 20px",
    fontSize: "2vh"
  },
  resumoItens: {
    overflow: "auto",
    flexGrow: "1",
    padding: "0px 20px",
    fontSize: "2vh",
    textAlign: "left"
  }
});

const Resumo = props => {
  const shortcutQtd = (item, unitprice, plusOrMinus) => {
    const updatedItem = props.resumo
      .filter(obj => obj.item === item)
      .map(element => {
        if (plusOrMinus === "+1")
          return {
            item: item,
            quantia: element.quantia + 1,
            value: element.value + unitprice,
            unitPrice: unitprice
          };
        else if (element.quantia > 1)
          return {
            item: item,
            quantia: element.quantia - 1,
            value: element.value - unitprice,
            unitPrice: unitprice
          };
        else return null;
      });

    const newResumo = props.resumo.map(obj => {
      return obj.item === item ? updatedItem[0] : obj;
    });
    props.setresumo(newResumo.filter(elem => elem !== null));
  };

  return (
    <>
      <h4>Resumo</h4>
      <section className={css(styles.title)}>
        <span>Item</span>
        <span>R$</span>
      </section>
      <section className={css(styles.resumoItens)}>
        <ul className={css(styles.ul)}>
          {props.resumo.map((itemResumo, index) => {
            const item = itemResumo.item;
            const quantia = itemResumo.quantia;
            const price = itemResumo.value;
            const unitPrice = itemResumo.unitPrice;
            return (
              <li key={index}>
                <CardResumomItem
                  item={item}
                  quantia={quantia}
                  price={price + ",00"}
                  unitprice={unitPrice}
                  handleClick={shortcutQtd}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Resumo;
