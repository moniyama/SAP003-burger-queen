import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import { db } from "../firebase/firebase-config";
import Button from "../components/Button";
import MenuGroup from "../components/CardMenuGroup";
import ModalHamburguer from "../components/ModalHamburguer";
import ModalMesa from "../components/ModalMesa";
import ResumoItens from "../components/ResumoItens";

export default function MenuPage() {
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
    db.collection("MENU")
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
        <ResumoItens resumo={resumo} setresumo={updateResumo} />
        <div className={css(styles.subtotal)}>
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
        </div>
      </section>
      <ModalHamburguer
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
}

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
