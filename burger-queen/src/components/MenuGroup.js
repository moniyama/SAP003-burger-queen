import React from "react";
import Button from "../components/Button";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  menuGroupSection: {
    textAlign:'center',
  },
  menuTitle: {
    color:'red',
    fontSize:'18px',
  },
  menuItem:{
    display:'flex',
    justifyContent:'space-evenly',
  },
});

const MenuGroup = props => {
  // se fazer o state aqui, cada group vai ter um state resumo
  return (
    <section className={css(styles.menuGroupSection)}>
      <p className={css(styles.menuTitle)}>{props.title}</p>
      <p className={css(styles.menuItem)} id={props.type}>
        {props.menu.map((item, index) => {
          if (item.type === props.type)
            return (
              <Button
                key={index}
                handleClick={props.click} 
                title={item.item + ' R$' + item.value}
              /> 
            )
            return null
        })}
      </p>
    </section>
  );
};
export default MenuGroup;
