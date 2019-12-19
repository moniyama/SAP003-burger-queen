import React, {useState, useEffect} from "react";
import ToggleOffOutlinedIcon from '@material-ui/icons/ToggleOffOutlined';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';

const ToggleIcon = (props) => {
const [toggleState, settoggleState] = useState(false)
const [hamburguerMenu, setHamburguerMenu] = useState([])

const turnToggleIconOn = (e) => {
  settoggleState(true)
  // setHamburguer([e.currentTarget])
  console.log('pegar o item que ficou on, e marcar o hamburguer')
  const itemAdded = e.currentTarget.attributes.title.value
  setHamburguerMenu([itemAdded])
}

useEffect(()=> {
  console.log(hamburguerMenu)
})
  return (
    <>
      <span>{props.title} </span>
      { toggleState === false 
        ? <ToggleOffOutlinedIcon title={props.title} onClick={turnToggleIconOn}/>
        : <ToggleOnIcon title={props.title} onClick={()=> settoggleState(false)}/>
      } 
    </>
  )
}

export default ToggleIcon