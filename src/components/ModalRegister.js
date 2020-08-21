import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Button from "./Button";
import Input from "./Input";
import { StyleSheet, css } from "aphrodite";
import { auth, db } from "../firebase/firebase-config";
import translateError from "../Utils/translateError";

export default function ModalRegister(props) {
  const [user, setUser] = useState({});
  const [btnState, setBtnState] = useState(true);
  const [password, setPassword] = useState({});
  const [samePassword, setSamePassword] = useState(false);
  const [registerError, setRegisterError] = useState({ state: false });

  useEffect(() => {
    setUser({ name: "", email: "", job: "kitchen" });
    setBtnState(true);
    setPassword({
      password: "",
      confPassword: ""
    });
    setSamePassword(false);
    setRegisterError({ state: false });
  }, [props.show]);

  useEffect(() => {
    password.password === password.confPassword && password.password !== ""
      ? setSamePassword(true)
      : setSamePassword(false);
  }, [password]);

  useEffect(() => {
    user.name && user.email !== "" && samePassword
      ? setBtnState(false)
      : setBtnState(true);
  }, [samePassword, user]);

  const saveUserDatabase = () => {
    db.collection("users")
      .add({ ...user, user_uid: auth.currentUser.uid })
      .then(props.onHide());
  };

  const createAcc = () => {
    auth
      .createUserWithEmailAndPassword(user.email, password.password)
      .then(() => saveUserDatabase())
      .catch(error => {
        setRegisterError({
          ...registerError,
          state: true,
          message: error.code
        });
      });
  };

  return (
    <Modal
      backdrop="static"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-80w"
    >
      <Modal.Header>
        <Modal.Title>CADASTRO</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <Input
            id="input-register-name"
            type="text"
            placeholder="Nome"
            autoFocus={true}
            class={styles.input}
            onChange={e => setUser({ ...user, name: e.target.value })}
          />
          <Input
            id="input-register-email"
            type="email"
            placeholder="Email"
            class={styles.input}
            onChange={e => setUser({ ...user, email: e.target.value })}
            autoComplete={"username"}
          />
          <Input
            id="input-register-password"
            type="password"
            placeholder="Senha"
            class={styles.input}
            onChange={e =>
              setPassword({ ...password, password: e.target.value })
            }
            autoComplete={"new-password"}
          />
          <Input
            id="input-register-password-confirmation"
            type="password"
            placeholder="Confirmação de Senha"
            class={styles.input}
            onChange={e =>
              setPassword({ ...password, confPassword: e.target.value })
            }
            autoComplete={"new-password"}
          />
          {password.password === "" || samePassword ? (
            ""
          ) : (
            <p className={css(styles.errorMessage)}>Senha não confere</p>
          )}
          <div className={css(styles.jobSection)}>
            <h4>SETOR:</h4>
            <div className={css(styles.radioSection)}>
              <div className={css(styles.radioLabelSection)}>
                <Input
                  type="radio"
                  id="radio-coz"
                  class={styles.radio}
                  name="job"
                  onChange={e => setUser({ ...user, job: e.target.value })}
                  value="kitchen"
                  checked={true}
                />
                <label htmlFor={"radio-coz"} className={css(styles.radioLabel)}>
                  COZINHA
                </label>
              </div>
              <div className={css(styles.radioLabelSection)}>
                <Input
                  type="radio"
                  id={"radio-sal"}
                  class={styles.radio}
                  name={"job"}
                  onChange={e => setUser({ ...user, job: e.target.value })}
                  value={"hall"}
                />
                <label htmlFor={"radio-sal"} className={css(styles.radioLabel)}>
                  SALÃO
                </label>
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className={css(styles.footer)}>
        <div>
          <Button
            class={styles.btns}
            title={"CANCELAR"}
            handleClick={props.onHide}
          />
          <Button
            class={styles.btns}
            type={"submit"}
            title={"CRIAR CONTA"}
            handleClick={createAcc}
            disabled={btnState}
          />
        </div>
          {registerError.state && <p>{translateError(registerError.message)}</p>}
      </Modal.Footer>
    </Modal>
  );
}

const styles = StyleSheet.create({
  radio: {
    width: "10%",
    transform: "scale(2)"
  },
  input: {
    display: "block",
    padding: "4%",
    margin: "0% 3% 2%",
    width: "94%",
    "@media (min-width: 800px)": {
      padding: "2%"
    }
  },
  radioSection: {
    display: "flex",
    justifyContent: "space-around"
  },
  radioLabelSection: {
    width: "48%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  radioLabel: {
    margin: "2% 3% "
  },
  footer: {
    display: "block",
    textAlign: "center"
  },
  jobSection: {
    marginTop: "5%"
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    font: "large"
  },
  btns: {
    padding: "3%",
    width: "40%"
  }
});
