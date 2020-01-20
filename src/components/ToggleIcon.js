import React from "react";
import { ToggleOffOutlined, ToggleOn } from "@material-ui/icons";
import changeToggleIcon from "../Utils/changeToggleIcon";

export default function ToggleIcon(props) {
  return (
    <p>
      {props.title}
      {props.state ? (
        <ToggleOn
          title={props.title}
          onClick={e => changeToggleIcon(e, { ...props })}
        />
      ) : (
        <ToggleOffOutlined
          title={props.title}
          onClick={e => changeToggleIcon(e, { ...props })}
        />
      )}
    </p>
  );
}
