import React, {useState, useEffect} from "react";

const Resumo = (props) => {
  let subtotal = 0
  for (const value in props.resumo) {
    if (props.resumo.hasOwnProperty(value)) {
      const element = props.resumo[value]
      subtotal += element.value
    }
    console.log(subtotal)
  }
  return (
    <>
      <h4>Resumo</h4>
      <ul>
        { props.resumo.map((itemResumo, index) => {
          const item = itemResumo.item
          const quantia = itemResumo.quantia
          const price = itemResumo.value
      return <li key={index}> {item}
        <p>{quantia} R${price}</p></li>
      })
      }
      </ul>
      <section>
        Sub-Total {subtotal}
      </section>
    </>
  )
};

export default Resumo;