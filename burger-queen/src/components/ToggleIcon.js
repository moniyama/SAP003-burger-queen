import React, {useState, useEffect} from "react";
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';

const ToggleIcon = props => {
  const turnToggleIconOn = e => {
    e.currentTarget.attributes.title.value === "ADICIONAL QUEIJO"
      ? settoggleStatCheese(true)
      : settoggleStatEgg(true);

    const newStatusadditionalMenu = additionalMenu.map(item => {
      return e.currentTarget.attributes.title.value === "ADICIONAL OVO"
        ? { ...item, ovo: true }
        : { ...item, queijo: true };
    });
    setAdditionalMenu(newStatusadditionalMenu);
  };

  const turnToggleIconOff = e => {
    e.currentTarget.attributes.title.value === "ADICIONAL QUEIJO"
      ? settoggleStatCheese(false)
      : settoggleStatEgg(false);

    const newStatusadditionalMenu = additionalMenu.map(item => {
      return e.currentTarget.attributes.title.value === "ADICIONAL OVO"
        ? { ...item, ovo: false }
        : { ...item, queijo: false };
    });
    setAdditionalMenu(newStatusadditionalMenu);
  };

  return (
    <>
      <p>
        {props.title}
        {props.state ? (
          <ToggleOnIcon title={props.title} onClick={turnToggleIconOff} />
        ) : (
          <ToggleOffOutlinedIcon
            title={props.title}
            onClick={turnToggleIconOn}
          />
        )}
      </p>
    </>
  );
};


export default ToggleIcon