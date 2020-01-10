import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import { StyleSheet, css } from "aphrodite";
import MenuGroup from "../components/CardMenuGroup";
import Resumo from "../components/Resumo";
import HamburguerOptionModalHtml from "../components/ModalHamburguer";
import Button from "../components/Button";
import ModalMesa from "../components/ModalMesa";

// não funciona:
// import { ToggleOffOutlinedIcon, ToggleOnIcon } from '@material-ui/icons'
// link do firebase deploy

// tem diferença em usar o forEach ou o map no state, qdo se quer alterar um dado do state?
// forEach => altera direto,
// map => tem que dar o setstate

// nos modals, tem um {...props} => pra que serve? eh do bootstrap?

// consigo usar switch qdo tenho duas condições (com &&)? função addHamb

// Erros que aparecem: função como props =>
// mas não aparece qdo usa handleClick => função handClose
// vale a pena transformar o item em state? poderia usar o
// useeffect para realizar a função de checkitens, e passaria apenas a função
// de setitem.

// aphrodite subtotal/modalbtnends => botões que tem css iguais e 1 diferença

// input na modalMesa => melhor usa o onchange (setar o state no onchange) ou getelementbyid mesmo?

const styles = StyleSheet.create({
  main: {
    padding: "3%",
    display: "flex",
    height: "78vh"
  },
  menu: {
    width: "60%",
    height: "100%",
    overflow: "auto"
  },
  resumo: {
    width: "40%",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "100%"
  },
  endBtns: {
    height: "60px",
    width: "100%",
    fontSize: "20px"
  },
  subtotal: {
    marginTop: "7%"
  }
});

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [resumo, setResumo] = useState([]);
  const [showModalMesa, setShowModalMesa] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [initialHamburguerState, setInitialHamburguerState] = useState({});
  const [disabledBtns, setDisabledBtns] = useState(true);
  const [subtotal, setSubtotal] = useState(0);

  const updateResumo = newResumo => setResumo(newResumo);
  const addItemResumo = newItem => setResumo([...resumo, newItem]);
  const handleClose = () => setshowModal(false);
  const handleCloseModalMesa = () => setShowModalMesa(false);

  useEffect(() => {
    firebase
      .firestore()
      .collection("MENU")
      .orderBy("type", "asc")
      .get()
      .then(querySnapshot => {
        const products = querySnapshot.docs.map(doc => doc.data());
        setMenu(products);
      });
  }, []);

  useEffect(() => {
    const updateSubtotal = () => {
      setSubtotal(
        resumo.reduce(
          (acumulador, valorAtual) => acumulador + valorAtual.value,
          0
        )
      );
    };

    resumo.length === 0 ? setDisabledBtns(true) : setDisabledBtns(false);
    setInitialHamburguerState({});
    updateSubtotal();
  }, [resumo]);

  const addItem = e => {
    const newItem = e.currentTarget.title;
    const itemPrice = Number(e.currentTarget.value.slice(2));
    checkHasItemOrdered(newItem, itemPrice);
  };

  const checkHasItemOrdered = (itemAdded, itemPrice) => {
    const hasItem = resumo.some(item => item["item"] === itemAdded);
    if (hasItem) {
      let newResumo = resumo.map(item => {
        if (item.item === itemAdded) {
          item.quantia += 1;
          item.value = itemPrice * item.quantia;
          return item;
        } else return item;
      });
      updateResumo(newResumo);
    } else {
      addItemResumo({
        item: itemAdded,
        quantia: 1,
        value: itemPrice,
        unitPrice: itemPrice
      });
    }
  };

  const getHambType = e => {
    setInitialHamburguerState({
      type: e.currentTarget.title,
      value: Number(e.currentTarget.value.slice(2))
    });

    setshowModal(true);
  };

  return (
    <main className={css(styles.main)}>
      <section className={css(styles.menu)}>
        <MenuGroup
          title="Café da Manhã"
          type="breakfast"
          menu={menu}
          click={e => addItem(e)}
        />
        <MenuGroup
          title="Hamburgueres"
          type="hamburguer"
          menu={menu}
          click={getHambType}
        />
        <MenuGroup
          title="Acompanhamentos"
          type="side-dishes"
          menu={menu}
          click={e => addItem(e)}
        />
        <MenuGroup
          title="Bebidas"
          type="beverages"
          menu={menu}
          click={e => addItem(e)}
        />
      </section>
      <section className={css(styles.resumo)} id="resumo">
        <Resumo resumo={resumo} setresumo={updateResumo} />
        <section className={css(styles.subtotal)}>
          <h4>Sub-Total: R$ {subtotal + ",00"}</h4>
          <Button
            class={styles.endBtns}
            title={"Finalizar Pedido"}
            handleClick={() => setShowModalMesa(true)}
            disabled={disabledBtns}
          />
          <Button
            class={styles.endBtns}
            title={"Cancelar Pedido"}
            handleClick={() => updateResumo([])}
            disabled={disabledBtns}
          />
        </section>
      </section>
      <HamburguerOptionModalHtml
        show={showModal}
        onHide={handleClose}
        animation={false}
        initialhambstate={initialHamburguerState}
        additemresumo={addItemResumo}
        checkitem={checkHasItemOrdered}
      />
      <ModalMesa
        show={showModalMesa}
        onHide={handleCloseModalMesa}
        animation={false}
        setresumo={updateResumo}
        resumo={resumo}
        subtotal={subtotal}
      />
    </main>
  );
};

export default Menu;
