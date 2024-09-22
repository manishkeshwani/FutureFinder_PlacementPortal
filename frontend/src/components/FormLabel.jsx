import React from 'react'

const FormLabel = (props) => {
  return (
    <label htmlFor={props.htmlFor} className="form-label">{props.label}</label>
  )
}

export default FormLabel
