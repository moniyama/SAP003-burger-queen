import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase-config";
import { StyleSheet, css } from "aphrodite";
import Button from "../components/Button";

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    // justifyContent:'space-between'
  },
  menu: {
    width:'450px',
  },

  menuGroupTitle: {
    textAlign:'center',

  },
  menuItem:{
    color:'red',
    display:'flex',
    justifyContent:'center',
    alignContent:''
  }
});

// const Resumo = () => {
//   return <div>OIOI</div>;
// };

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
  console.log(menu)

  // const item = query.data();
  // switch (item.type) {
  //   case 'breakfast':
  //     breakfast.push(item);
  //     break;
  //   case 'hamburguer':
  //     hamburguer.push(item);
  //     break;
  //   case 'beverages':
  //     beverages.push(item);
  //     break;
  //   case 'side-dishes':
  //     side.push(item);
  //     break;
  //   default:
  // }

  // useEffect(() => {
  //   menu.forEach(item => {
  //     if (item.type === "breakfast") {
  //       document.getElementById("breakfast").innerHTML += `
  //       <p>${item.item} ${item.value}
  //       ${<Button handleClick={() => console.log("click")} title={"as"} />}</p>
  //       `;
  //     } if (item.type === "hamburguer") {
  //       document.getElementById("hamburguer").innerHTML += `
  //       <p>${item.item} ${item.value}
  //       ${<Button handleClick={() => console.log("click")} title={"as"} />}</p>
  //       `;
  //     } if (item.type === "side-dishes") {
  //       document.getElementById("side").innerHTML += `
  //       <p>${item.item} ${item.value}
  //       ${<Button handleClick={() => console.log("click")} title={"as"} />}</p>
  //       `;
  //     } if (item.type === "beverages") {
  //       document.getElementById("beverages").innerHTML += `
  //       <p>${item.item} ${item.value}
  //       ${<Button handleClick={() => console.log("click")} title={"as"} />}</p>
  //       `;
  //     }

  //   })
  // }, [menu]);

  return (
    <main className={css(styles.main)}>
      <section id="Menu" className={css(styles.menu)}>
        <section className={css(styles.menuGroupTitle)}>Café da Manhã</section>
          <p className={css(styles.menuItem)} id="breakfast"></p>
          { menu.map((item) => {
          if(item.type === 'breakfast')
            return <Button handleClick={() => console.log("click")} title={item.item} value={item.value} key={'key-' + item.item} />
          })}
        <section className={css(styles.menuGroupTitle)}>Hamburguer</section>
          <p className={css(styles.menuItem)} id="hamburguer"></p>
          { menu.map((item) => {
          if(item.type === 'hamburguer')
            return <Button handleClick={() => console.log("click")} title={item.item} value={item.value} key={'key-' + item.item} />
          })}
        <section className={css(styles.menuGroupTitle)}>Acompanhamentos</section>
          <p className={css(styles.menuItem)} id="side"></p>
          { menu.map((item) => {
          if(item.type === 'side-dishes')
            return <Button handleClick={() => console.log("click")} title={item.item} value={item.value} key={'key-' + item.item} />
          })}
        <section className={css(styles.menuGroupTitle)}>Bebidas</section>
          <p className={css(styles.menuItem)} id="beverages"></p>
          { menu.map((item) => {
          if(item.type === 'beverages')
            return <Button handleClick={() => console.log("click")} title={item.item} value={item.value} key={'key-' + item.item} />
          })}
        </section>
      <section className="order"> RESUMO </section>
    </main>
  );
};

export default Menu;

// export default {
//   Menu: Menu,
//   Resumo: Resumo
// };
