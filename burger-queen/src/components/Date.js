import React from "react";

export default function HourFormate(props) {
  return (
    <p>
      {`${props.title}: ${new Date(props.time).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      })}`}
    </p>
  );
}
