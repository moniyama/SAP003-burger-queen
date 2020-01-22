import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import { Modal } from "react-bootstrap";
import Button from "./Button";
import ToggleIcon from "./ToggleIcon";

export default function ModalHamburguer(props) {
  const [hambResumo, setHambResumo] = useState([]);

  const [toggleStateEgg, settoggleStatEgg] = useState(false);
  const [toggleStateCheese, settoggleStatCheese] = useState(false);
  const [btnModalDisabledStatus, setBtnModalDisabledStatus] = useState(true);

  const initialhambstate = props.initialhambstate;
  const { type, value } = initialhambstate;

  useEffect(() => {
    setHambResumo([
      {
        type,
        hamburguer: "",
        cheese: false,
        egg: false,
        value
      }
    ]);
    setBtnModalDisabledStatus(true);
    settoggleStatEgg(false);
    settoggleStatCheese(false);
  }, [type, value]);

  const setNewState = (newState, setState, aditional) => {
    setState(newState);
    let newHambResumo;
    aditional === "egg"
      ? (newHambResumo = hambResumo.map(elem => ({
          ...elem,
          egg: newState
        })))
      : (newHambResumo = hambResumo.map(elem => ({
          ...elem,
          cheese: newState
        })));
    setHambResumo(newHambResumo);
  };

  const addHamb = () => {
    const obj = hambResumo[0];
    const { egg, cheese, type, hamburguer, value } = obj;

    let finalItemPrice = "";
    const addCheese = cheese ? "adicional queijo" : "";
    const additional =
    addCheese +
      (addCheese === "" ? (egg ? "adicional ovo" : "") : egg ? " e ovo" : "");

    const itemAdded = ` ${type} ${hamburguer} ${additional} `;

    switch (additional) {
      case "adicional queijo e ovo":
        finalItemPrice = value + 2;
        break;
      case "":
        finalItemPrice = value;
        break;
      default:
        finalItemPrice = value + 1;
    }

    const newItem = { item: itemAdded, quantity: 1, value: finalItemPrice };

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
        <Modal.Title>
          {hambResumo.length === 0
            ? { type }
            : ` ${type} ${hambResumo[0].hamburguer}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section
          className={css(styles.modalButtonsOptionsSection)}
          aria-label="First group"
        >
          <Button
            title={"BOVINO"}
            handleClick={getHamburguerFlavor}
            disabled={false}
            class={styles.modalBtnFlavors}
          />
          <Button
            title={"FRANGO"}
            handleClick={getHamburguerFlavor}
            disabled={false}
            class={styles.modalBtnFlavors}
          />
          <Button
            title={"VEGETARIANO"}
            handleClick={getHamburguerFlavor}
            disabled={false}
            class={styles.modalBtnFlavors}
          />
        </section>
        <section className={css(styles.modalAditional)}>
          <h4>ADICIONAL POR R$ 1,00 CADA</h4>
          <section className={css(styles.modalAditionalItens)}>
            <ToggleIcon
              title={"QUEIJO"}
              state={toggleStateCheese}
              setstate={newState =>
                setNewState(newState, settoggleStatCheese, "cheese")
              }
            />
            <ToggleIcon
              title={"OVO"}
              state={toggleStateEgg}
              setstate={newState =>
                setNewState(newState, settoggleStatEgg, "egg")
              }
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
}
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
    fontSize: "large",
    display: "flex",
    justifyContent: "space-evenly"
  }
});
