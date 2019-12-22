import React from "react";
import Button from "../components/Button";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  menuGroupSection: {
    textAlign: "center"
  },
  menuTitle: {
    color: "red",
    fontSize: "25px"
  },
  menuItem: {
    display: "flex",
    flexWrap: "wrap"
  },
  menuItemBtn: {
    fontSize:'2vh',
    height: "100px",
    width: "180px"
  }
});

const MenuGroup = props => {
  return (
    <section className={css(styles.menuGroupSection)}>
      <p className={css(styles.menuTitle)}>{props.title} </p>
      <p className={css(styles.menuItem)} id={props.type}>
        {props.menu.map((item, index) => {
          if (item.type === props.type)
            return (
              <Button
                key={index}
                handleClick={props.click}
                title={item.item}
                value={"R$" + item.value}
                class={styles.menuItemBtn}
              />
            );
          return null;
        })}
      </p>
    </section>
  );
};
export default MenuGroup;
