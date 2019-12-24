import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import { Modal, Alert } from "react-bootstrap";
import Button from "../components/Button";
import firebase from "../firebase/firebase-config";

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
  const [inputTable, setInputTable] = useState({});
  const [buttonAvailableState, setButtonAvailableState] = useState(true);

  const [endingModalShowState, setEndingModalShowState] = useState(true);

  const setButtonAvailable = () => {
    const tableName = document.getElementById("input-table-name").value;
    const tableNumber = document.getElementById("input-table-number").value;
    tableName !== "" && tableNumber > 0
      ? setButtonAvailableState(false) &&
        setInputTable({ name: tableName, table: tableNumber })
      : setButtonAvailableState(true);
  };

  const endOrder = () => {
    const tableName = document.getElementById("input-table-name").value;
    const tableNumber = document.getElementById("input-table-number").value;
    setInputTable({ name: tableName, table: tableNumber });
    props.onHide();
    props.setresumo([]);
    sendOrderToFirebase();
  };
  
  const sendOrderToFirebase = () =>
    firebase
      .firestore()
      .collection("ORDERS")
      .add({
        // NÃO FUNCIONA INPUTS DA MESA =,(
        status_delivered: false,
        status_ready: false,
        timestamp: Date(),
        orders: props.resumo
      });

  return (
    <>
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
          <form>
            <input
              id="input-table-name"
              type="text"
              placeholder="NOME DO CLIENTE"
              autoFocus={true}
              className={css(styles.input)}
              onChange={() => setButtonAvailable()}
            ></input>
            <input
              id="input-table-number"
              type="number"
              placeholder="NUMERO DA MESA"
              className={css(styles.input)}
              onChange={() => setButtonAvailable()}
            ></input>
          </form>
        </Modal.Body>
        <Modal.Footer className={css(styles.footer)}>
          <Button
            class={styles.btns}
            title={"Cancelar"}
            handleClick={props.onHide}
          />
          <Button
            class={styles.btns}
            title={"FINALIZAR"}
            handleClick={endOrder}
            disabled={buttonAvailableState}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalMesa;
