import React from "react";

export default function HourFormate(props) {
  const date = props.time
    ? new Date(props.time).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      })
    : "";
  return <p>{`${props.title}: ${date}`}</p>;
}
