import React from "react";

const HourFormate = props => (
  <p>
    {`${props.title}: ${new Date(props.time).toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })}`}
  </p>
);
export default HourFormate;
