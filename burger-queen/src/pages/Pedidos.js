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

// tem diferença em usar o forEach ou o map no state, qdo se quer alterar um dado do state?
// forEach => altera direto,
// map => tem que dar o setstate

// consigo usar switch qdo tenho duas condições (com &&)? função addHamb

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
  const [btnModalDisabledStatus, setBtnModalDisabledStatus] = useState(true);

  const handleClose = () => setshowModal(false);

  let newResumo = [];

  const addHamb = () => {
    handleClose();

    const itemAddedArray = additionalMenu.map(obj => {
      if (obj.queijo === false && obj.ovo === false) {
        return `${obj.type} ${obj.hamburguer}`
      } else if (obj.queijo === true && obj.ovo === false) {
          return `${obj.type} ${obj.hamburguer} com queijo adicional`;
        } else if (obj.queijo === true && obj.ovo === true) {
          return `${obj.type} ${obj.hamburguer} com queijo e ovo adicional`;
        } else {
          return `${obj.type} ${obj.hamburguer} com ovo adicional`;
        }
    });
    const itemAdded = itemAddedArray[0]
    checkHasItemOrdered(itemAdded);
    console.log("itemadded", itemAdded);
  };

  useEffect(() => {
    console.log("resumo", resumo);
  }, [resumo]);

  useEffect(() => {
    console.log("additional menu", additionalMenu);
  }, [additionalMenu]);

  const addItem = e => {
    const itemAdded = e.currentTarget.innerHTML;
    checkHasItemOrdered(itemAdded);
  };

  const checkHasItemOrdered = (itemAdded) => {
    const hasItem = resumo.some(item => item["item"] === itemAdded);
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
    settoggleStatEgg(false);
    settoggleStatCheese(false);
    setBtnModalDisabledStatus(true);
    setshowModal(true);

    additionalMenu.forEach(obj => {
      obj.type = e.currentTarget.innerHTML;
      obj.hamburguer = "";
      obj.queijo = false;
      obj.ovo = false;
    });
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
    setBtnModalDisabledStatus(false);
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
              disabled={false}
            />
            <Button
              title={"Frango"}
              handleClick={getHamburguerFlavor}
              disabled={false}
            />
            <Button
              title={"Vegetariano"}
              handleClick={getHamburguerFlavor}
              disabled={false}
            />
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
          <Button
            title="Cancelar"
            handleClick={() => handleClose}
            disabled={false}
          />
          <Button
            title="OK"
            handleClick={() => addHamb()}
            disabled={btnModalDisabledStatus}
          />
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
