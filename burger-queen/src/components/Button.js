import React from "react"

const button = (props) => (
    <button onClick={props.handleClick}>{props.title}</button>
)

export default button