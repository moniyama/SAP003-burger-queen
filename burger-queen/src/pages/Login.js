import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import { StyleSheet, css } from "aphrodite";
import Input from "../components/Input";
import Button from "../components/Button";
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
  }
});

const LoginPage = () => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        console.log("user logged");
      } else {
        console.log("user NOT logged");
      }
    });
  }, []);

  const login = e => {
    e.preventDefault();
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log("ir para pagina correta"))
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
      });
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
            />
            <Input
              class={styles.input}
              type={"password"}
              placeholder={"Senha"}
              id={"password-login"}
            />
            <Button
              class={styles.loginBtn}
              title={"ENTRAR"}
              handleClick={e => login(e)}
            />
          </form>
          <p className={css(styles.pRegister)}>
            Ainda não se registrou? Cadastre-se AQUI
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
