import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {
  return (
    <>
        <Link
            to={props.navigate}
            className={`flex justify-center items-center gap-2 ${props.bgColor} ${props.textColor} ${props.paddingY} ${props.paddingX} rounded-lg`}
            onClick={props.onClick}
          >
            {props.icon}
            <h1>{props.children}</h1>
          </Link>
    </>
  )
}

export default Button