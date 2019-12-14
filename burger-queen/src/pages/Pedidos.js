import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
// import { StyleSheet, css } from "aphrodite";
import MenuGroup from  '../components/MenuGroup'

// const Resumo = () => {
//   return <div>OIOI</div>;
// };



// const getMenu = () => {
//   const breakfast = []
//   const hamburguer = []
//   const beverages = []
//   const side = []

//   firebase.firestore().collection('MENU').get()
//     .then(querySnapshot => {
//       querySnapshot.forEach((query)=> {
//         const item = query.data();
//         switch (item.type) {
//           case 'breakfast':
//             breakfast.push(item);
//             break;
//           case 'hamburguer':
//             hamburguer.push(item);
//             break;
//           case 'beverages':
//             beverages.push(item);
//             break;
//           case 'side-dishes':
//             side.push(item);
//             break;
//           default:
//         } 
//       })
//     });
//     return [breakfast, hamburguer, beverages, side]
// }

const Menu = () => {
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
  
  const menuGroups = [
    { title: 'Café da Manhã', array: breakfast, key: 'key-menu-group-breakfast' },
    { title: 'Hamburgueres', array: hamburguer, key: 'key-menu-group-hamburguer' }, 
    { title: 'Acompanhamentos', array: side, key: 'key-menu-group-side' },
    { title: 'Bebidas', array: beverages, key: 'key-menu-group-beverages' }
  ]

  return (
    <section className=''>
  { menuGroups.map( (group) => {
    return <MenuGroup key={group.key} title={group.title} array={group.array} />
  })}
    </section >
  )
};

export default Menu

// export default {
//   Menu: Menu
// };
