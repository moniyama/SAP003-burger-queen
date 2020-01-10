import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Modal } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import ToggleIcon from "./ToggleIcon";

// change color dos btns sabores de hamburgueres qdo clicados

const styles = StyleSheet.create({
  modal: {
    textAlign: "center"
  },
  modalBtnFlavors: {
    height: "70px",
    width: "180px"
  },
  modalBtnEnd: {
    width: "45.5%",
    height: "100px"
    // ok = ":active": {
    //backgroundColor: "#6E8C03"
    // }

    // cancelar= ":active": {
    //backgroundColor: "#BF190A"
    // }
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
  }
});

const HamburguerOptionModalHtml = props => {
  const [hambResumo, setHambResumo] = useState([]);

  const [toggleStateEgg, settoggleStatEgg] = useState(false);
  const [toggleStateCheese, settoggleStatCheese] = useState(false);
  const [btnModalDisabledStatus, setBtnModalDisabledStatus] = useState(true);

  const hambType = props.initialhambstate.type;
  const hambValue = props.initialhambstate.value;

  useEffect(() => {
    setHambResumo([
      {
        type: hambType,
        hamburguer: "",
        queijo: false,
        ovo: false,
        value: hambValue
      }
    ]);
    setBtnModalDisabledStatus(true);
    settoggleStatEgg(false);
    settoggleStatCheese(false);
  }, [hambType, hambValue]);

  const setNewEggState = newState => {
    settoggleStatEgg(newState);
    const newHambResumo = hambResumo.map(elem => ({ ...elem, ovo: newState }));
    setHambResumo(newHambResumo);
  };

  const setNewCheeseState = newState => {
    settoggleStatCheese(newState);
    const newHambResumo = hambResumo.map(elem => ({
      ...elem,
      queijo: newState
    }));
    setHambResumo(newHambResumo);
  };

  const addHamb = () => {
    const obj = hambResumo[0];
    const additionalEgg = obj.ovo;
    const additionalCheese = obj.queijo;
    const hamburguerType = obj.type;
    const hamburguerFlavor = obj.hamburguer;
    const initialPrice = obj.value;

    let finalItemPrice = "";
    let additional = "";

    if (additionalCheese === true && additionalEgg === false) {
      additional = "queijo adicional";
    } else if (additionalCheese === false && additionalEgg === true) {
      additional = "ovo adicional";
    } else if (additionalCheese === true && additionalEgg === true) {
      additional = "queijo e ovo adicional";
    }

    const itemArray = [hamburguerType, hamburguerFlavor, additional];
    const itemAdded = itemArray.join(" ");

    switch (additional) {
      case "queijo e ovo adicional":
        finalItemPrice = initialPrice + 2;
        break;
      case "":
        finalItemPrice = initialPrice;
        break;
      default:
        finalItemPrice = initialPrice + 1;
    }

    const newItem = { item: itemAdded, quantia: 1, value: finalItemPrice };

    props.additemresumo(newItem);
    props.checkitem(itemAdded, finalItemPrice);
    props.onHide();
  };

  const getHamburguerFlavor = e => {
    setBtnModalDisabledStatus(false);
    const newHambFlavor = hambResumo.map(elem => ({
      ...elem,
      hamburguer: e.currentTarget.title
    }));
    setHambResumo(newHambFlavor);
  };

  return (
    <Modal
      backdrop="static"
      className={css(styles.modal)}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>{hambType}</Modal.Title>
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
              title={"ADICIONAL QUEIJO"}
              state={toggleStateCheese}
              setstate={setNewCheeseState}
            />
            <ToggleIcon
              title={"ADICIONAL OVO"}
              state={toggleStateEgg}
              setstate={setNewEggState}
              resumo={hambResumo}
            />
          </section>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button
          title="Cancelar"
          handleClick={() => {
            props.onHide();
            setBtnModalDisabledStatus(true);
            settoggleStatEgg(false);
            settoggleStatCheese(false);
          }}
          disabled={false}
          class={styles.modalBtnEnd}
        />
        <Button
          title="OK"
          handleClick={addHamb}
          disabled={btnModalDisabledStatus}
          class={styles.modalBtnEnd}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default HamburguerOptionModalHtml;
