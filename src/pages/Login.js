import React, { useState } from "react";
import { auth } from "../firebase/firebase-config";
import { StyleSheet, css } from "aphrodite";
import Input from "../components/Input";
import Button from "../components/Button";
import ModalRegister from "../components/ModalRegister";
import Footer from "../components/Footer";
import Image from "../components/Image";

export default function LoginPage() {
  const [showModalRegister, setShowModalRegister] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState({ state: false });

  const handleCloseModalRegister = () => setShowModalRegister(false);

  const login = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(loginData.email, loginData.password)
      .catch(error => {
        setLoginError({ ...loginError, state: true, message: error.code });
      });
  };

  const showError = message => {
    switch (message) {
      case "auth/invalid-email":
        return <p className={css(styles.error)}>Email inválido</p>;
      case "auth/user-disabled":
        return <p className={css(styles.error)}>Usuário desabilitado</p>;
      case "auth/user-not-found":
        return <p className={css(styles.error)}>Usuário não encontrado</p>;
      default:
        return <p className={css(styles.error)}>Senha incorreta</p>;
    }
  };

  return (
    <>
      <main className={css(styles.main)}>
        <section>
          <Image
            class={styles.logo}
            src={require("../img/logo_vert.PNG")}
            alt={"logo"}
          />
        </section>
        <section className={css(styles.formSection)}>
          <div className={css(styles.form)}>
            <form>
              <Input
                class={styles.input}
                type="email"
                placeholder="Email"
                autofocus={true}
                onChange={e =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                autoComplete="username"
              />
              <Input
                class={styles.input}
                type="password"
                placeholder="Senha"
                autoComplete="current-password"
                onChange={e =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
              <Button
                class={styles.loginBtn}
                title="ENTRAR"
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
      <Footer class={styles.footer} />
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column"
  },
  logo: {
    width: "100%"
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    height: "53%",
    margin: "2vw 3vw 15%"
  },
  form: {
    justifyContent: "center",
    width: "100%",
    marginTop: "10%"
  },
  loginBtn: {
    backgroundColor: "#99AABF",
    width: "50%",
    margin: "auto",
    height: "8vh",
    fontSize: "25px"
  },
  input: {
    fontSize: "25px",
    padding: "4%",
    margin: "0% 3% 2%",
    width: "94%"
  },
  pRegister: {
    margin: "3%",
    fontSize: "20px"
  },
  error: {
    fontSize: "20px",
    color: "red",
    fontWeight: "bold"
  },
  footer: {
    bottom: "0"
  }
});
