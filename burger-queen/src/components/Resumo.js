import React from "react";

const Resumo = (props) => {

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
        {}
      </section>
    </>
  )
};

export default Resumo;