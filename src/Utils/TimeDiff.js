import React from "react";

export default function timeDiff(props) {
  const calculate = () => {
    const inicialTime = new Date(props.timeOrdered).getTime();
    let endTime;
    props.page === "kitchen"
      ? (endTime = new Date(props.timeCooked).getTime())
      : (endTime = new Date(props.timeDelivered).getTime());
    const microSecondsDiff = Math.abs(endTime - inicialTime);
    const minDiff = Math.round(microSecondsDiff / (1000 * 60));
    return (
      <div>
        {minDiff < 60
          ? `${minDiff} minutos`
          : `${Math.round(minDiff / 60)}h ${minDiff % 60}min`}
      </div>
    );
  };

  return props.timeDelivered !== undefined || props.timeCooked !== undefined
    ? calculate()
    : "";
}
