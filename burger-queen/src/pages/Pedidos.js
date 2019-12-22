import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import MenuGroup from "../components/MenuGroup";
import Button from "../components/Button";
import Resumo from "../components/Resumo";
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

//toggleIcon => melhorar a função - repetitiva
//toggleIcon => transformar em componente -> compartilha states

const styles = StyleSheet.create({
  main: {
    padding: "3%",
    display: "flex",
    height:'100vh'
  },
  menu: {
    width: "60%",
    height:'100%',
    overflow:'scroll'
  },
  resumo: {
    width: "40%",
    textAlign: "center",
    display:'flex',
    justifyContent:'space-between',
    flexDirection:'column',
    height:'100%'
  },
  modal: {
    textAlign: "center"
  },

  modalBtnFlavors:{
    height: "70px",
    width: "180px"
  },
  modalBtnEnd:{
    width:'45.5%',
    height:'100px'
  },
  modalButtonsOptionsSection: {
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
    { type: "", hamburguer: "", queijo: false, ovo: false, value:"" }
  ]);

  const [toggleStateEgg, settoggleStatEgg] = useState(false);
  const [toggleStateCheese, settoggleStatCheese] = useState(false);
  const [btnModalDisabledStatus, setBtnModalDisabledStatus] = useState(true);

  const handleClose = () => setshowModal(false);

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
    console.log(resumo)
  }, [resumo])

  useEffect(() => {
    console.log(additionalMenu)
  }, [additionalMenu])

  const addItem = e => {
    const itemAdded = e.currentTarget.title;
    const value = Number(e.currentTarget.value.slice(2))
    checkHasItemOrdered(itemAdded, value);
  };

  const checkHasItemOrdered = (itemAdded, price) => {
    const hasItem = resumo.some(item => item["item"] === itemAdded);
    if (hasItem) {
      newResumo = resumo.map(item => {
        if (item.item === itemAdded) {
          item.quantia += 1;
          item.value = price*item.quantia
          return item;
        } else {
          return item;
        }
      });
    } else {
      newResumo = [...resumo, { item: itemAdded, quantia: 1, value: price}];
    }
    setResumo(newResumo);
  };

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
    let value = ''
    const valueInitial = additionalMenu[0].value

    if(itemAdded.includes('queijo' && 'ovo')) {
      value = valueInitial + 2
    } else if(itemAdded.includes('queijo' || 'ovo')) {
      value = valueInitial + 1
    } else value = valueInitial

    checkHasItemOrdered(itemAdded, value);
  };

  const getHamburguerType = e => {
    settoggleStatEgg(false);
    settoggleStatCheese(false);
    setBtnModalDisabledStatus(true);
    setshowModal(true);
    const value = Number(e.currentTarget.value.slice(2))
    additionalMenu.forEach(obj => {
      obj.type = e.currentTarget.title;
      obj.hamburguer = "";
      obj.queijo = false;
      obj.ovo = false;
      obj.value = value
    });
  };

  const getHamburguerFlavor = e => {
    const newStatusadditionalMenu = additionalMenu.map(item => {
      switch (e.currentTarget.title) {
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
            className={css(styles.modalButtonsOptionsSection)}
            aria-label="First group"
          >
            <Button
              title={"Bovino"}
              handleClick={getHamburguerFlavor}
              disabled={false}
              class={styles.modalBtnFlavors}
            />
            <Button
              title={"Frango"}
              handleClick={getHamburguerFlavor}
              disabled={false}
              class={styles.modalBtnFlavors}
            />
            <Button
              title={"Vegetariano"}
              handleClick={getHamburguerFlavor}
              disabled={false}
              class={styles.modalBtnFlavors}
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
            class={styles.modalBtnEnd}
          />
          <Button
            title="OK"
            handleClick={() => addHamb()}
            disabled={btnModalDisabledStatus}
            class={styles.modalBtnEnd}
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
      <section className={css(styles.resumo)} id="resumo">
        <Resumo resumo={resumo}/>
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
