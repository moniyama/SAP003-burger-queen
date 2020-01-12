import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import { StyleSheet, css } from "aphrodite";
import Input from "../components/Input";
import Button from "../components/Button";
import ModalRegister from "../components/ModalRegister";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    height: "95vh"
  },
  logo: {
    width: "100%"
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    height: "51vh",
    margin: "2% 3%"
  },
  form: {
    justifyContent: "center",
    margin: "auto",
    width: "100%"
  },
  loginBtn: {
    backgroundColor: "#99AABF",
    width: "50%",
    margin: "auto",
    height: "8vh",
    fontSize: "25px"
  },
  input: {
    fontSize: "25px"
  },
  pRegister: {
    margin: "3%",
    fontSize: "20px"
  },
  error: {
    fontSize: "20px",
    color: "red",
    fontWeight: "bold"
  }
});

const LoginPage = () => {
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState({ state: false });

  const handleCloseModalRegister = () => setShowModalRegister(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // const displayName = user.displayName;
        // const email = user.email;
        // const emailVerified = user.emailVerified;
        // const photoURL = user.photoURL;
        // const isAnonymous = user.isAnonymous;
        // const uid = user.uid;
        // const providerData = user.providerData;
        console.log("user logged");
      } else {
        console.log("user NOT logged");
      }
    });
  }, []);

  const login = e => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .then(() =>
        console.log("ir para pagina correta e zerar state de login e de erro")
      )
      .catch(error => {
        setLoginError({ ...loginError, state: true, message: error.code });
      });
  };
  const showError = message => {
    switch (message) {
      case "auth/invalid-email":
        return <p>Email inválido</p>;
      case "auth/user-disabled":
        return <p>Usuário desabilitado</p>;
      case "auth/user-not-found":
        return <p>Usuário não encontrado</p>;
      default:
        return <p>Senha incorreta</p>;
    }
  };
  return (
    <main className={css(styles.main)}>
      <section>
        <figure>
          <img
            className={css(styles.logo)}
            src={require("../img/logo_vert.PNG")}
            alt={"logo"}
          ></img>
        </figure>
      </section>
      <section className={css(styles.formSection)}>
        <div className={css(styles.form)}>
          <form>
            <Input
              class={styles.input}
              type={"email"}
              placeholder={"Email"}
              id={"email-login"}
              autofocus={true}
              onChange={e =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              autoComplete={"username"}
            />
            <Input
              class={styles.input}
              type={"password"}
              placeholder={"Senha"}
              id={"password-login"}
              autoComplete={"current-password"}
              onChange={e =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <Button
              class={styles.loginBtn}
              title={"ENTRAR"}
              handleClick={e => login(e)}
            />
          </form>
          {loginError.state ? showError(loginError.message) : ""}
          <p
            className={css(styles.pRegister)}
            onClick={() => setShowModalRegister(true)}
          >
            Ainda não se registrou? Cadastre-se AQUI
          </p>
        </div>
      </section>
      <ModalRegister
        show={showModalRegister}
        onHide={handleCloseModalRegister}
        animation={false}
      />
    </main>
  );
};

export default LoginPage;
