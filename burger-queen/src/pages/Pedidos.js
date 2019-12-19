import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import MenuGroup from "../components/MenuGroup";
import Button from "../components/Button";
import { StyleSheet, css } from "aphrodite";
import { Modal } from "react-bootstrap";
import ToggleOffOutlinedIcon from "@material-ui/icons/ToggleOffOutlined";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
// import ToggleIcon from "../components/ToggleIcon";

// import { ToggleOffOutlinedIcon, ToggleOnIcon } from '@material-ui/icons'

const styles = StyleSheet.create({
  main: {
    padding: "3%",
    display: "flex"
  },
  menu: {
    width: "60%"
  },
  resumo: {
    width: "40%",
    textAlign: "center"
  },
  modal: {
    textAlign: "center"
  },
  modalButtonsOptions: {
    display: "flex",
    justifyContent: "space-evenly"
  },
  modalAditional: {
    marginTop: "15px"
  },
  modalAditionalItens: {
    backgroundColor: "beige",
    fontSize: "large"
  },
  btb: {
    color: "red"
  }
});

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [resumo, setResumo] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [additionalMenu, setAdditionalMenu] = useState([
    { queijo: false, ovo: false }
  ]);

  const handleClose = () => setshowModal(false);

  let newResumo = [];

  const addHamb = e => {
    handleClose();
    // const itemAdded = additionalMenu
    // console.log(itemAdded)
    // const hasItem = resumo.some( item => item['item'] === itemAdded )
    // checkHasItemOrdered(hasItem, itemAdded)
    // console.log('verificar se tem o item no resumo')
    // console.log('add item no resumo')
  };

  // useEffect(() => {
  //   console.log("modal", showModal);
  // }, [showModal]);

  useEffect(() => {
    console.log("resumo", resumo);
  }, [resumo]);

  useEffect(() => {
    console.log('additional menu', additionalMenu);
  }, [additionalMenu]);

  const addItem = e => {
    const itemAdded = e.currentTarget.innerHTML;
    const hasItem = resumo.some(item => item["item"] === itemAdded);
    checkHasItemOrdered(hasItem, itemAdded);
  };

  const checkHasItemOrdered = (hasItem, itemAdded) => {
    if (hasItem) {
      newResumo = resumo.map(item => {
        if (item.item === itemAdded) {
          item.quantia += 1;
          return item;
        } else {
          return item;
        }
      });
    } else {
      newResumo = [...resumo, { item: itemAdded, quantia: 1 }];
    }
    setResumo(newResumo);
  };

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

  function HamburguerOptionModalHtml(props) {
    return (
      <Modal
        className={css(styles.modal)}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>OPÇÕES DE HAMBURGUER</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section
            className={css(styles.modalButtonsOptions)}
            aria-label="First group"
          >
            <Button class={styles.btb} title={"Bovino"} />
            <Button title={"Frango"} />
            <Button title={"Vegetariano"} />
          </section>
          <section className={css(styles.modalAditional)}>
            <h4>ADICIONAL POR R$ 1,00</h4>
            <section className={css(styles.modalAditionalItens)}>
              <ToggleIcon title={"ADICIONAL QUEIJO"} />
              <ToggleIcon title={"ADICIONAL OVO"} />
            </section>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button title="Cancelar" handleClick={() => setshowModal(false)} />
          <Button title="OK" handleClick={() => addHamb()} />
        </Modal.Footer>
      </Modal>
    );
  }

  const ToggleIcon = props => {

    const [toggleState, settoggleState] = useState(false);
    const [toggleStateEgg, settoggleStatEgg] = useState(false);
    const [toggleStateCheese, settoggleStateCheese] = useState(false);
  
    const turnToggleIconOn = (e) => {
      settoggleState(true);
      console.log(e.currentTarget.attributes.title.value)
      console.log("pegar o item que ficou on, e marcar o hamburguer");
      const addedItem = additionalMenu.map(item => {
        console.log(item)
        return e.currentTarget.attributes.title.value === "ADICIONAL OVO"
          ? { ...item, ovo: true }
          : { ...item, queijo: true };
      });
      console.log('newStatus', addedItem)
      // setAdditionalMenu(newStatus);
  }
  
    const turnToggleIconOff = e => {
      
      console.log("settoggleState(false)");

      console.log("pegar o item que ficou on, e marcar o hamburguer");
        const newStatus = additionalMenu.map((item) => {
          return e.currentTarget.attributes.title.value === 'ADICIONAL OVO'
            ? 
              {...item, ovo: false}

            : {...item, queijo: false}
      })
      setAdditionalMenu(newStatus)
    };

    return (
      <>
        <span>{props.title} </span>
        {toggleState === false ? (
          <ToggleOffOutlinedIcon
            title={props.title}
            onClick={turnToggleIconOn}
          />
        ) : (
          <ToggleOnIcon title={props.title} onClick={turnToggleIconOff} />
        )}
      </>
    );
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
          click={() => setshowModal(true)}
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
      <section className={css(styles.resumo)} id="order">
        <h4>Resumo</h4>
        <section>
          {/* { resumo.map(itemOrder => {
            return <section>{itemOrder}</section>
          })} */}
        </section>
      </section>
      <HamburguerOptionModalHtml
        show={showModal}
        onHide={handleClose}
        animation={false}
      />
    </main>
  );
};

export default Menu;
