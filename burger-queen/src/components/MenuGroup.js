import React from "react"
import Button from "../components/Button"
import { StyleSheet, css } from "aphrodite";

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

const menuGroup = (props) => {
    const array = props.array;
//     array.forEach(element => {
//         console.log(element.item)
// });

   return (

    <section className={css(styles.menu)}>
        <p className={css(styles.title)}>{props.title}</p>
        <Button handleClick = {() => console.log('click')} title={'as'} />
    </section>
)
}
export default menuGroup