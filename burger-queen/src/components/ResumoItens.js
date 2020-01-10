import React from "react";
import { StyleSheet, css } from "aphrodite";
import CardResumomItem from "./CardResumoItem";

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
    fontSize: "2vh"
  },
  resumoItens: {
    overflow: "auto",
    flexGrow: "1",
    paddingLeft: "2%",
    fontSize: "2vh",
    textAlign: "left"
  }
});

// array.find e array.splice

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
        else if (element.quantia > 1 && plusOrMinus !== null)
          return {
            item: item,
            quantia: element.quantia - 1,
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
              quantia={itemResumo.quantia}
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
};

export default Resumo;
