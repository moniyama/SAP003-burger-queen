import React, { useState, useEffect } from "react";
import Button from "./Button";
import { Modal } from "react-bootstrap";
import { StyleSheet, css } from "aphrodite";
import ToggleIcon from "./ToggleIcon";

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
  const [toggleStateEgg, settoggleStatEgg] = useState(false);
  const [toggleStateCheese, settoggleStatCheese] = useState(false);

  const [hambResumo, setHambResumo] = useState([]);

  const resumo = props.resumo;

  const setNewEggState = newState => {
    settoggleStatEgg(newState);
    const newHambResumo = hambResumo.map(elem => {
      return { ...elem, ovo: newState };
    });
    setHambResumo(newHambResumo);
  };

  const setNewCheeseState = newState => {
    settoggleStatCheese(newState);
    const newHambResumo = hambResumo.map(elem => {
      return { ...elem, queijo: newState };
    });
    setHambResumo(newHambResumo);
  };

  const addHamb = () => {
    const obj = hambResumo[0];
    const additionalEgg = obj.ovo;
    const additionalCheese = obj.queijo;
    const hamburguerType = obj.type;
    const hamburguerFlavor = obj.hamburguer;
    const valueInitial = obj.value;

    let valueFinal = "";
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

    switch(additional) {
      case "queijo e ovo adicional":
        valueFinal = valueInitial + 2;
        console.log("+2");
        break
      case "":
        valueFinal = valueInitial;
        break
      default:
        valueFinal = valueInitial + 1;
    }

    const newResumo = { item: itemAdded, quantia: 1, value: valueFinal };

    props.setresumo([...resumo, newResumo]);
    props.checkitem(itemAdded, valueFinal);
    props.onHide();
  };

  const getHamburguerFlavor = e => {
    props.initialhambstate.hamburguer = e.currentTarget.title;
    props.setbtndisablestate(false);
    const newHambResumo = hambResumo.map(elem => {
      return { ...elem, hamburguer: e.currentTarget.title };
    });
    setHambResumo(newHambResumo);
  };

  useEffect(() => {
    setHambResumo([
      {
        type: props.initialhambstate.type,
        hamburguer: "",
        queijo: false,
        ovo: false,
        value: props.initialhambstate.value
      }
    ]);

    settoggleStatEgg(false);
    settoggleStatCheese(false);
  }, [props.initialhambstate.type, props.initialhambstate.value]);

  return (
    <Modal
      className={css(styles.modal)}
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
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
          handleClick={() => props.onHide()}
          disabled={false}
          class={styles.modalBtnEnd}
        />
        <Button
          title="OK"
          handleClick={addHamb}
          disabled={props.btnstate}
          class={styles.modalBtnEnd}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default HamburguerOptionModalHtml;
