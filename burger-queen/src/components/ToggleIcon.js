import React from "react";
import { ToggleOffOutlined, ToggleOn } from '@material-ui/icons'

const ToggleIcon = props => {
  const changeToggleIcon = e => {
    e.currentTarget.attributes.title.value === "ADICIONAL QUEIJO"
      ? props.setstate(!props.state)
      : props.setstate(!props.state);
  };
  return (
    <p>
      {props.title}
      {props.state ? (
        <ToggleOn title={props.title} onClick={changeToggleIcon} />
      ) : (
        <ToggleOffOutlined title={props.title} onClick={changeToggleIcon} />
      )}
    </p>
  );
};

export default ToggleIcon;
