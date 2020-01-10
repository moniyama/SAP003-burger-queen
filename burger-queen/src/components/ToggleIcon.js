import React from "react";
import ToggleOffOutlinedIcon from "@material-ui/icons/ToggleOffOutlined";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
// import { ToggleOffOutlinedIcon, ToggleOnIcon } from '@material-ui/icons'

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
        <ToggleOnIcon title={props.title} onClick={changeToggleIcon} />
      ) : (
        <ToggleOffOutlinedIcon title={props.title} onClick={changeToggleIcon} />
      )}
    </p>
  );
};

export default ToggleIcon;
