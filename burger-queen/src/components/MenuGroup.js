import React from "react";
import Button from "../components/Button";
import { StyleSheet, css } from "aphrodite";

// como formatar cada componente individualmente 

const styles = StyleSheet.create({
  menuGroupSection: {
    textAlign:'center',
  },
  menuTitle: {
    color:'red',
    fontSize:'25px',
  },
  menuItem:{
    display:'flex',
    // justifyContent:'space-evenly',
    flexWrap:'wrap',
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
                type={"css(styles.menuItemBtn)"}
              /> 
            )
            return null
        })}
      </p>
    </section>
  );
};
export default MenuGroup;
