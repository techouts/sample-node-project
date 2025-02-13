import React from 'react'
type proptype={
    img?:string
}

function MinusComponet(props: proptype) {
  return (
    <img src={props?.img}  alt="nested minus image"/>
  )
}

export default MinusComponet