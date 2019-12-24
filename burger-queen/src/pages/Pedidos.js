import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import MenuGroup from "../components/MenuGroup";
import Resumo from "../components/Resumo";
import { StyleSheet, css } from "aphrodite";
import HamburguerOptionModalHtml from "../components/ModalHamburguer";
import Button from "../components/Button";
import ModalMesa from "../components/ModalMesa";

// import ToggleIcon from "../components/ToggleIcon";
// import { ToggleOffOutlinedIcon, ToggleOnIcon } from '@material-ui/icons'

// tem diferença em usar o forEach ou o map no state, qdo se quer alterar um dado do state?
// forEach => altera direto,
// map => tem que dar o setstate

// consigo usar switch qdo tenho duas condições (com &&)? função addHamb

// bug botão do modal: o estado não fica disabled se cancela. apenas se dar ok ou cancelar

// Erros que aparecem: função como props
// aphrodite subtotal/modalbtnends => botões que tem css iguais e 1 diferença

// como colocar o subtotal em função, dentro do useeffect [resumo]

const styles = StyleSheet.create({
  main: {
    padding: "3%",
    display: "flex",
    height: "100vh"
  },
  menu: {
    width: "60%",
    height: "100%",
    overflow: "scroll"
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
    height: "90px",
    width: "100%"
  },
  subtotal: {
    marginTop: "7%"
  }
});

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [resumo, setResumo] = useState([]);
  const [showModalMesa, setShowModalMesa] = useState(false)
  const [showModal, setshowModal] = useState(false);
  const [hamburguer, setHamburguer] = useState({});
  const [endBtnsshow, setEndBtnsshow] = useState(true);
  const [btnModalDisabledStatus, setBtnModalDisabledStatus] = useState(true);

  const setBtnDisabledStatus = newStatus =>
    setBtnModalDisabledStatus(newStatus);

  const updateResumo = newResumo => setResumo(newResumo);
  const handleClose = () => setshowModal(false);
  const handleCloseModalMesa = () => setShowModalMesa(false)
  let newResumo = [];

  useEffect(() => {
    firebase
      .firestore()
      .collection("MENU")
      .get()
      .then(querySnapshot => {
        const products = querySnapshot.docs.map(doc => {
          return doc.data();
        });
        setMenu(products);
      });
  }, []);

  useEffect(() => {
    console.log(resumo);
    resumo.length === 0 ? setEndBtnsshow(true) : setEndBtnsshow(false);
  }, [resumo]);

  let subtotal = 0;
  for (const value in resumo) {
    if (resumo.hasOwnProperty(value)) {
      const element = resumo[value];
      subtotal += element.value;
    }
  }

  const addItem = e => {
    const itemAdded = e.currentTarget.title;
    const value = Number(e.currentTarget.value.slice(2));
    checkHasItemOrdered(itemAdded, value);
  };

  const checkHasItemOrdered = (itemAdded, price) => {
    const hasItem = resumo.some(item => item["item"] === itemAdded);
    if (hasItem) {
      newResumo = resumo.map(item => {
        if (item.item === itemAdded) {
          item.quantia += 1;
          item.value = price * item.quantia;
          return item;
        } else {
          return item;
        }
      });
    } else {
      newResumo = [
        ...resumo,
        { item: itemAdded, quantia: 1, value: price, unitPrice: price }
      ];
    }
    updateResumo(newResumo);
  };

  const getHambType = e => {
    setHamburguer({
      type: e.currentTarget.title,
      hamburguer: "",
      queijo: false,
      ovo: false,
      value: Number(e.currentTarget.value.slice(2))
    });

    setshowModal(true);
    setBtnDisabledStatus(true);
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
            disabled={endBtnsshow}
          />
          <Button
            class={styles.endBtns}
            title={"Cancelar Pedido"}
            handleClick={() => updateResumo([])}
            disabled={endBtnsshow}
          />
        </section>
      </section>
      <>
        <HamburguerOptionModalHtml
          show={showModal}
          onHide={handleClose}
          animation={false}
          hamburguer={hamburguer}
          setresumo={updateResumo}
          resumo={resumo}
          checkitem={checkHasItemOrdered}
          setbtndisablestate={setBtnDisabledStatus}
          btnstate={btnModalDisabledStatus}
        />
        <ModalMesa show={showModalMesa}
          onHide={handleCloseModalMesa}
          animation={false}/>
      </>
    </main>
  );
};

export default Menu;
