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
    { type: "", hamburguer: "", queijo: false, ovo: false }
  ]);
  const [toggleStateEgg, settoggleStatEgg] = useState(false);
  const [toggleStateCheese, settoggleStatCheese] = useState(false);

  const [btnModalDisabledStatus, setBtnModalDisabledStatus] = useState(true)

  const handleClose = () => setshowModal(false);

  const newResumo = [];

  const addHamb = () => {
    handleClose();
    settoggleStatEgg(false);
    settoggleStatCheese(false);
    
    const itemAddedArray = additionalMenu.map((obj)=> {
      if (obj.queijo === true || obj.ovo === true) {
        if(obj.queijo === true && obj.ovo === false) {
          return `${obj.type} ${obj.hamburguer} com queijo adicional`
        } else if (obj.queijo === true && obj.ovo === true) {
          return `${obj.type} ${obj.hamburguer} com queijo e ovo adicional`
        } else {
          return `${obj.type} ${obj.hamburguer} com ovo adicional`
        }

      } else {
        return `${obj.type} ${obj.hamburguer}`
      }

    })

    // const hasItem = resumo.some(item => item["item"] === itemAdded);
    console.log('stringfy',JSON.stringify(itemAddedArray));
    console.log('itemadded',(itemAddedArray));

  }

  // useEffect(() => {
  //   console.log("modal", showModal);
  // }, [showModal]);

  useEffect(() => {
    console.log("resumo", resumo);
  }, [resumo]);

  useEffect(() => {
    console.log("additional menu", additionalMenu);
  }, [additionalMenu]);

  const addItem = e => {
    const itemAdded = e.currentTarget.innerHTML;
    const hasItem = resumo.some(item => item["item"] === itemAdded);
    console.log(typeof itemAdded);

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

  const getHamburguerType = e => {
    setshowModal(true);
    additionalMenu.forEach(obj => {
      obj.type = e.currentTarget.innerHTML;
    });
    console.log(additionalMenu);
  };

  const getHamburguerFlavor = e => {
    const newStatusadditionalMenu = additionalMenu.map(item => {
      switch (e.currentTarget.innerHTML) {
        case "Bovino":
          return { ...item, hamburguer: "Bovino" };
        case "Frango":
          return { ...item, hamburguer: "Frango" };
        case "Vegetariano":
          return { ...item, hamburguer: "Vegetariano" };
        default:
      }
      return null;
    });
    setAdditionalMenu(newStatusadditionalMenu);
    setBtnModalDisabledStatus(false)
  };

  const HamburguerOptionModalHtml = props => {
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
            <Button
              class={styles.btb}
              title={"Bovino"}
              handleClick={getHamburguerFlavor}
            />
            <Button title={"Frango"} handleClick={getHamburguerFlavor} />
            <Button title={"Vegetariano"} handleClick={getHamburguerFlavor} />
          </section>
          <section className={css(styles.modalAditional)}>
            <h4>ADICIONAL POR R$ 1,00</h4>
            <section className={css(styles.modalAditionalItens)}>
              <ToggleIcon
                state={toggleStateCheese}
                title={"ADICIONAL QUEIJO"}
              />
              <ToggleIcon state={toggleStateEgg} title={"ADICIONAL OVO"} />
            </section>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <Button title="Cancelar" handleClick={() => setshowModal(false)} />
          <Button title="OK" disabled={btnModalDisabledStatus} handleClick={() => addHamb()} />
        </Modal.Footer>
      </Modal>
    );
  };

  const ToggleIcon = props => {
    const turnToggleIconOn = e => {
      e.currentTarget.attributes.title.value === "ADICIONAL QUEIJO"
        ? settoggleStatCheese(true)
        : settoggleStatEgg(true);

      const newStatusadditionalMenu = additionalMenu.map(item => {
        return e.currentTarget.attributes.title.value === "ADICIONAL OVO"
          ? { ...item, ovo: true }
          : { ...item, queijo: true };
      });
      setAdditionalMenu(newStatusadditionalMenu);
    };

    const turnToggleIconOff = e => {
      e.currentTarget.attributes.title.value === "ADICIONAL QUEIJO"
        ? settoggleStatCheese(false)
        : settoggleStatEgg(false);

      const newStatusadditionalMenu = additionalMenu.map(item => {
        return e.currentTarget.attributes.title.value === "ADICIONAL OVO"
          ? { ...item, ovo: false }
          : { ...item, queijo: false };
      });
      setAdditionalMenu(newStatusadditionalMenu);
    };

    return (
      <>
        <p>
          {props.title}
          {props.state ? (
            <ToggleOnIcon title={props.title} onClick={turnToggleIconOff} />
          ) : (
            <ToggleOffOutlinedIcon
              title={props.title}
              onClick={turnToggleIconOn}
            />
          )}
        </p>
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
          click={getHamburguerType}
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
