import React, { useState, useEffect } from "react";
import { StyleSheet, css } from "aphrodite";
import { Modal } from "react-bootstrap";
import { db } from "../firebase/firebase-config";
import Button from "../components/Button";
import Input from "../components/Input";

export default function ModalMesa(props) {
  const [buttonAvailableState, setButtonAvailableState] = useState(true);
  const [userName, setUserName] = useState("");
  const [userTable, setUserTable] = useState("");

  useEffect(() => {
    userName && userTable !== ""
      ? setButtonAvailableState(false)
      : setButtonAvailableState(true);
  }, [userName, userTable]);

  const resetUser = () => {
    setUserName("");
    setUserTable("");
  };

  const setUserData = (e, input) => {
    input === "name"
      ? setUserName(e.target.value)
      : setUserTable(e.target.value);
  };

  const endOrder = () => {
    sendOrderToFirebase(userName, userTable);
    props.setresumo([]);
    resetUser();
    props.onHide();
  };

  const sendOrderToFirebase = (name, number) => {
    db.collection("ORDERS").add({
      user_name: name,
      user_table: number,
      user_total_value: props.subtotal,
      order: props.resumo,
      order_status_cooked: false,
      order_status_delivered: false,
      timestamp_ordered: new Date().getTime(),
      date_ordered: new Date().toLocaleString(undefined)
    });
  };
  const cancel = () => {
    resetUser();
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header>
        <Modal.Title>CLIENTE</Modal.Title>
      </Modal.Header>
      <Modal.Body className={css(styles.body)}>
        <form>
          <Input
            id="input-table-name"
            type="text"
            placeholder="NOME DO CLIENTE"
            class={styles.input}
            autoFocus={true}
            onChange={e => setUserData(e, "name")}
          />
          <Input
            id="input-table-number"
            type="number"
            placeholder="NUMERO DA MESA"
            class={styles.input}
            onChange={e => setUserData(e, "table")}
          />
        </form>
      </Modal.Body>
      <Modal.Footer className={css(styles.footer)}>
        <Button class={styles.btns} title={"Cancelar"} handleClick={cancel} />
        <Button
          class={styles.btns}
          title={"FINALIZAR"}
          handleClick={endOrder}
          disabled={buttonAvailableState}
        />
      </Modal.Footer>
    </Modal>
  );
}

const styles = StyleSheet.create({
  body: {
    display: "block",
    textAlign: "center"
  },
  footer: {
    justifyContent: "center"
  },
  btns: {
    width: "45%",
    height: "70px"
  },
  input: {
    display: "block",
    padding: "4%",
    margin: "0% 3% 2%",
    width: "94%"}
});
