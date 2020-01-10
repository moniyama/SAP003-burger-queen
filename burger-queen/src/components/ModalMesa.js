import React, { useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { Modal } from "react-bootstrap";
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
  const [buttonAvailableState, setButtonAvailableState] = useState(true);

  const setButtonAvailable = () => {
    const tableName = document.getElementById("input-table-name").value;
    const tableNumber = document.getElementById("input-table-number").value;
    tableName !== "" && tableNumber > 0
      ? setButtonAvailableState(false)
      : setButtonAvailableState(true);
  };

  const endOrder = () => {
    const tableName = document.getElementById("input-table-name").value;
    const tableNumber = +document.getElementById("input-table-number").value;
    sendOrderToFirebase(tableName, tableNumber);
    props.setresumo([]);
    props.onHide();
  };

  const sendOrderToFirebase = (name, number) => {
    firebase
      .firestore()
      .collection("ORDERS")
      .add({
        user_name: name,
        user_table: number,
        user_total_value: props.subtotal,
        order: props.resumo,
        order_status_cooked: false,
        order_status_delivered: false,
        time_ordered: new Date().toLocaleString("pt-BR")
      });
  };

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
  );
};

export default ModalMesa;
