import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import { StyleSheet, css } from "aphrodite";
import Input from "../components/Input";
import Button from "../components/Button";

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    padding: "0% 2% 2%",
    height: "83vh"
  },
  form: {
    width: "70%",
    margin: "auto"
  },
  loginBtn: {
    backgroundColor: "red"
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
      .then(()=> console.log('ir para pagina correta'))
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
      });
  };

  return (
    <main className={css(styles.main)}>
      <section>
        <form className={css(styles.form)}>
          <Input type={"email"} placeholder={"Email"} id={"email-login"} />
          <Input
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
      </section>
    </main>
  );
};

export default LoginPage;
