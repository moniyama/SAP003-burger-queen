import React from "react";
import { StyleSheet, css } from "aphrodite";
import Button from "./Button";

export default function MenuGroup(props) {
  return (
    <div className={css(styles.menuGroupSection)}>
      <header className={css(styles.menuTitle)}>{props.title} </header>
      <p className={css(styles.menuItem)} id={props.type}>
        {props.menu
          .filter(obj => obj.type === props.type)
          .map((item, index) => (
            <Button
              key={index}
              handleClick={props.click}
              title={item.item}
              value={"R$" + item.value}
              class={styles.menuItemBtn}
            />
          ))}
      </p>
    </div>
  );
}

const styles = StyleSheet.create({
  menuGroupSection: {
    textAlign: "center"
  },
  menuTitle: {
    color: "#BF190A",
    fontSize: "25px",
    fontWeight: "bold",
    marginBottom: "1%"
  },
  menuItem: {
    display: "flex",
    flexWrap: "wrap"
  },
  menuItemBtn: {
    fontSize: "20px",
    height: "80px",
    width: "175px"
  }
});
