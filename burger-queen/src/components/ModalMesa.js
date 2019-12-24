import React from "react";
import { StyleSheet, css } from "aphrodite";
import { Modal } from "react-bootstrap";
import Button from "../components/Button";

const styles = StyleSheet.create({
  body: {
    display: "block",
    textAlign: "center"
  },
  input: {
    justifyContent: "space-around",
    width: "80%",
    height: "70px",
    textAlign: "left",
    paddingLeft: "20px",
    marginTop: "2%"
  },
  footer: {
    justifyContent: "center"
  },
  btns: {
    width: "45%",
    height: "70px"
  }
});

const ModalMesa = props => {

  

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title>CLIENTE</Modal.Title>
      </Modal.Header>
      <Modal.Body className={css(styles.body)}>
        <input
          type="text"
          placeholder="NOME DO CLIENTE"
          autoFocus={true}
          className={css(styles.input)}
        ></input>
        <input
          type="number"
          placeholder="NUMERO DA MESA"
          className={css(styles.input)}
        ></input>
      </Modal.Body>
      <Modal.Footer className={css(styles.footer)}>
        <Button
          class={styles.btns}
          title={"Cancelar"}
          handleClick={() => props.onHide()}
        />
        <Button
          class={styles.btns}
          title={"FINALIZAR"}
          handleClick={() => console.log("FINALIZAR")}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMesa;
