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
  const [resumo, setResumo] = useState([]);
  
  let newResumo = [];

  const addItem = (e) => {
    const itemAdded = e.currentTarget.innerHTML
    const hasItem = resumo.some( item => item['item'] === itemAdded )
    if (hasItem) {
      newResumo = resumo.map((item) => {
          if(item.item === itemAdded) {
            item.quantia += 1
            return item
        } else {
          return item
        }
      })
    } else {
      newResumo = [...resumo, {item: itemAdded, quantia: 1 }]
      }
      setResumo(newResumo)
  }

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
        <MenuGroup title="Café da Manhã" type="breakfast" menu={menu} click={(e)=> addItem(e)} />
        <MenuGroup title="Hamburgueres" type="hamburguer" menu={menu} click={(e)=> addItem(e)} />
        <MenuGroup title="Acompanhamentos" type="side-dishes" menu={menu} click={(e)=> addItem(e)} />
        <MenuGroup title="Bebidas" type="beverages" menu={menu} click={(e)=> addItem(e)} />
      </section>
      <section className={css(styles.resumo)} id="order"> RESUMO </section>
    </main>
  );
};

export default Menu;

