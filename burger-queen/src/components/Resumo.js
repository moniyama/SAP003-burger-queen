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
    overflow: "scroll",
    flexGrow: "1",
    padding: "20px",
    fontSize: "2vh",
    textAlign: "left"
  },
  price: {
    alignSelf: "center"
  },
  qtdBox: {
    backgroundColor: "white",
    padding: "3% 10%",
    boxShadow: "inset 0 0px 7px",
    marginLeft: "6%"
  },
  listaItens: {
    display: "flex",
    justifyContent: "space-between"
  },

  itens: {
    display: "block"
  },
  subtotal: {
    marginTop: "7%"
  }
});

const Resumo = props => {
  const [endBtnsshow, setEndBtnsshow] = useState(true);
  const [resumo, setResumo] = useState(props.resumo)

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
    console.log('item', plusOrMinus)
    console.log('props.resumo', props.resumo)
    if(plusOrMinus === '+1') {
      const newQtd = props.resumo.map(element => {
      return item === element.item
      ? element.quantia += 1
      : element.quantia 
      })
      setResumo(newQtd)
  } else {
    const newQtd = props.resumo.map(element => {
      return item === element.item
      ? element.quantia -= 1
      : element.quantia 
      })
      setResumo(newQtd)
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
                    <Button
                      title={"-1"}
                      handleClick={(e)=> shortcutQtd(item, "-1")}
                      key={item+'-1'}
                      // class={styles.qtdBtn}
                    />
                    <Button title={"+1"}
                      handleClick={(e)=> shortcutQtd(item, "+1")}
                      key={item+'+1'}
                      // class={styles.qtdBtn}
                      />
                    <span className={css(styles.qtdBox)}>{quantia}</span>
                  </section>
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
