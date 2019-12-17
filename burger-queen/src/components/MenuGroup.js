import React from "react";
import Button from "../components/Button";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  title: {
    color: "red",
    paddingTop: "5px",
    textAlign: "center"
  },
  menu: {
    width: "100%",
    backgroundColor: "gray"
  }
});

const menuGroup = props => {
  const itensList = props.arrayItens;
  console.log(itensList);
  itensList.map(element => {
    console.log(element.item);
  });

  return (
    <section className={css(styles.menu)}>
      <p className={css(styles.title)}>{props.title}</p>
      <Button handleClick={() => console.log("click")} title={"as"} />
      <Button handleClick={() => console.log("click")} title={"as"} />
      {itensList.map(element => {
        return (
          <Button
            handleClick={() => console.log("click")}
            title={element.item}
          />
        );
      })}
    </section>
  );
};
export default menuGroup;
