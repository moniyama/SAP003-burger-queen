import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import Button from "../components/Button"
import { StyleSheet, css } from "aphrodite";

// const Resumo = () => {
//   return <div>OIOI</div>;
// };

const styles = StyleSheet.create({
  title: {
    color: 'red',
    paddingTop: '5px',
    textAlign: 'center'
  },
  menu: {
    width: '60%',
    backgroundColor: 'gray',
  }
})

const Menu = () => {
  // const [menu, setMenu] = useState('');

  const breakfast = []
  const hamburguer = []
  const beverages = []
  const side = []

  firebase.firestore().collection('MENU').get()
    .then(querySnapshot => {
      querySnapshot.forEach((query)=> {
        const item = query.data();
        switch (item.type) {
          case 'breakfast':
            breakfast.push(item);
            break;
          case 'hamburguer':
            hamburguer.push(item);
            break;
          case 'beverages':
            beverages.push(item);
            break;
          case 'side-dishes':
            side.push(item);
            break;
          default:
        } 
      })
    });

  // for(const element of breakfast) {
      // <Button handleClick = {() => console.log('click')} title={element.item} />
  // }

  return (
    <section className={css(styles.menu)}>
      <p className={css(styles.title)}>Café da Manhã</p>
      <Button handleClick = {() => console.log('click')} title={'BOTÃO'} />
    </section>
  )

};

export default Menu

// export default {
//   Menu: Menu
// };
