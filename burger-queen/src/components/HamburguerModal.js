import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { Modal } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import ToggleIcon from "../components/ToggleIcon";

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
    fontSize: "large"
  }
});

const HamburguerOptionModalHtml = props => {
  const [toggleStateEgg, settoggleStatEgg] = useState(false);
  const [toggleStateCheese, settoggleStatCheese] = useState(false);
  const [btnModalDisabledStatus, setBtnModalDisabledStatus] = useState(true);

  const [hambResumo, setHambResumo] = useState([]);

  const setBtnOff = () => setBtnModalDisabledStatus(true);
  const setBtnOn = () => setBtnModalDisabledStatus(false);

  useEffect(() => setBtnOn, [hambResumo]);
  useEffect(() => {
    console.log("toggleStateEgg", toggleStateEgg);
    console.log("toggleStateCheese", toggleStateCheese);
  }, [toggleStateCheese, toggleStateEgg]);

  useEffect(() => {
    console.log(hambResumo);
  }, [hambResumo]);

  const closingModal = () => {
    settoggleStatEgg(false);
    settoggleStatCheese(false);
    setBtnModalDisabledStatus(true);
    props.onHide();
  };

  const addHamb = () => {
    // JSON.stringify({hamburguerType} {hamburguerFlavor} )
    const obj = hambResumo[0];
    const additionalEgg = obj.ovo;
    const additionalCheese = obj.queijo;
    const hamburguerType = obj.type;
    const hamburguerFlavor = obj.hamburguer;

    let additional = "";

    const itemArray = [hamburguerType, hamburguerFlavor, additional];
    const itemAdded = itemArray.join(" ")
    console.log(itemAdded);
    
    // const itemArray = hambResumo.maps(obj => {
    //   const additionalEgg = obj.ovo;
    //   const additionalCheese = obj.queijo;
    //   const hamburguerType = obj.type;
    //   const hamburguerFlavor = obj.hamburguer;

    //   // if (additionalCheese === false && additionalEgg === false) {
    //   //   return `${hamburguerType} ${hamburguerFlavor}`;
    //   // } else if (additionalCheese === true && additionalEgg === false) {
    //   //   return `${hamburguerType} ${hamburguerFlavor} queijo adicional`;
    //   // } else if (additionalCheese === true && additionalEgg === true) {
    //   //   return `${hamburguerType} ${hamburguerFlavor} queijo e ovo adicional`;
    //   // } else {
    //   //   return `${hamburguerType} ${hamburguerFlavor} ovo adicional`;
    //   // }
    //   });
    // console.log(itemArray)
    closingModal();
  };

  // const itemAdded = itemAddedArray[0];
  // console.log(itemAdded);

  // let value = "";
  // const valueInitial = props.hamburguer.value;

  // if (itemAdded.includes("queijo" && "ovo")) {
  //   value = valueInitial + 2;
  // } else if (itemAdded.includes("queijo" || "ovo")) {
  //   value = valueInitial + 1;
  // } else value = valueInitial;

  // checkHasItemOrdered(itemAdded, value);

  const getHamburguerFlavor = e => {
    props.hamburguer.hamburguer = e.currentTarget.title;
    setHambResumo([props.hamburguer]);
    // console.log('hambResumoState', hambResumoState)
  };

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
            <ToggleIcon state={toggleStateCheese} title={"ADICIONAL QUEIJO"} />
            <ToggleIcon state={toggleStateEgg} title={"ADICIONAL OVO"} />
          </section>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button
          title="Cancelar"
          handleClick={() => props.onHide()}
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
