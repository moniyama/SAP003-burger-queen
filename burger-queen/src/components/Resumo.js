import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";

const styles = StyleSheet.create({
  endBtns: {
    height: "90px",
    width: "100%"
  },
  ul: {
    listStyleType: "none"
  },

  resumoItens: {
    overflow:'scroll',
    flexGrow:'1',
    padding: "20px",
    fontSize:'2vh',
    textAlign:'left',
  },
  price:{
    alignSelf:'center',
  },

  listaItens: {
    display: "flex",
    justifyContent: "space-between"
  },

  itens: {
    display: "block",
  },
  subtotal: {
    marginTop:'7%'
  }
});

const Resumo = props => {

  const [endBtnsshow, setEndBtnsshow] = useState(true)

  console.log(props.resumo)
  useEffect(()=>{
    console.log(props.resumo.length === 0)
    props.resumo.length === 0
    ? setEndBtnsshow(true)
    : setEndBtnsshow(false)

  },[props.resumo])

  let subtotal = 0;
  for (const value in props.resumo) {
    if (props.resumo.hasOwnProperty(value)) {
      const element = props.resumo[value];
      subtotal += element.value;
    }
  }
  return (
    <>
      <h4>Resumo</h4>
      <section className={css(styles.resumoItens)}>
        <ul className={css(styles.ul)}>
          {props.resumo.map((itemResumo, index) => {
            const item = itemResumo.item;
            const quantia = itemResumo.quantia;
            const price = itemResumo.value;
            return (
              <li key={index}>
                <section className={css(styles.listaItens)}>
                  <section className={css(styles.itens)}>
                    <p>{item}</p>
                    <Button title={"-1 "} />
                    <Button title={"+1"} />
                    <span>{quantia}</span>
                  </section >
                  <span className={css(styles.price)}>R$ {price}</span>
                </section>
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
