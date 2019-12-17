import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import { StyleSheet, css } from "aphrodite";
import MenuGroup from '../components/MenuGroup'

const styles = StyleSheet.create({
  main: {
  display: 'flex',
},
  menu:{
    width:'60%'
  },
  resumo: {
    width: '40%',
    textAlign:'center'
  } 
});

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("MENU")
      .get()
      .then(querySnapshot => {
        const products = querySnapshot.docs.map(doc => {
          return doc.data();
        });
        setMenu(products);
      });
  }, []);

  return (
    <main className={css(styles.main)}>
      <section className={css(styles.menu)}>
        <MenuGroup title="Café da Manhã" type="breakfast" menu={menu} />
        <MenuGroup title="Hamburgueres" type="hamburguer" menu={menu} />
        <MenuGroup title="Acompanhamentos" type="side-dishes" menu={menu} />
        <MenuGroup title="Bebidas" type="beverages" menu={menu} />
      </section>
      <section className={css(styles.resumo)} id="order"> RESUMO </section>
    </main>
  );
};

export default Menu;

