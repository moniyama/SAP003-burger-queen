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
  // const [menu, setMenu] = useState('')

  const breakfast = []
  const hamburguer = []
  const beverages = []
  const side = []

  firebase.firestore().collection('MENU').get()
    .then(querySnapshot => {
      querySnapshot.forEach((query)=> {
        console.log('item:', query.data().item, 'valor:', query.data().value );
        
        const item = {
          item: query.data().item,
          valor: query.data().value
        }

        switch (query.data().type) {
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
console.log(breakfast)
    });

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
