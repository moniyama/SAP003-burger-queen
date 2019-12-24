import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";
import CardResumomItem from "./CardResumoItem";

const styles = StyleSheet.create({
  endBtns: {
    height: "90px",
    width: "100%"
  },
  ul: {
    listStyleType: "none"
  },
  title: {
    display: "flex",
    justifyContent:'space-between',
    width:"100%",
    fontWeight:'bold',
  },
  resumoItens: {
    overflow: "scroll",
    flexGrow: "1",
    padding: "20px",
    fontSize: "2vh",
    textAlign: "left",
  },
  subtotal: {
    marginTop: "7%"
  }
});

const Resumo = props => {
  const [endBtnsshow, setEndBtnsshow] = useState(true);

  useEffect(() => {
    props.resumo.length === 0 ? setEndBtnsshow(true) : setEndBtnsshow(false);
  }, [props.resumo]);

  let subtotal = 0;
  for (const value in props.resumo) {
    if (props.resumo.hasOwnProperty(value)) {
      const element = props.resumo[value];
      subtotal += element.value;
    }
  }

  const shortcutQtd = (item, plusOrMinus) => {
    console.log("item", item);
    console.log("props.resumo", props.resumo);
    if (plusOrMinus === "+1") {
      console.log("aumenta a quantia e o price");
      // const newQtd = props.resumo.map(element => {
      //   return item === element.item ? (element.quantia += 1) : element.quantia;
      // });
      // props.setresumo(newQtd);
    } else {
      console.log("reduz a quantia e o price");
      // const newQtd = props.resumo.map(element => {
      //   return item === element.item && element.quantia > 1
      //     ? (element.quantia -= 1)
      //     : element.quantia;
      // });
      // props.setresumo(newQtd);
    }
  };

  return (
    <>
      <h4>Resumo</h4>
      <section className={css(styles.resumoItens)}>
        <ul className={css(styles.ul)}>
          <section className={css(styles.title)}>
            <span>Item</span>
            <span>R$</span>
          </section>
          {props.resumo.map((itemResumo, index) => {
            const item = itemResumo.item;
            const quantia = itemResumo.quantia;
            const price = itemResumo.value;
            return (
              <li key={index}>
                <CardResumomItem item={item} quantia={quantia} price={price} />
              </li>
            );
          })}
        </ul>
      </section>
      <section className={css(styles.subtotal)}>
        <h4>Sub-Total: R$ {subtotal}</h4>
        <Button
          class={styles.endBtns}
          title={"Finalizar Pedido"}
          handleClick={() => console.log("click")}
          disabled={endBtnsshow}
        />
        <Button
          class={styles.endBtns}
          title={"Cancelar Pedido"}
          handleClick={() => console.log("click")}
          disabled={endBtnsshow}
        />
      </section>
    </>
  );
};

export default Resumo;
