import React from 'react'

const FormTextArea = (props) => {
  return (
    <div className="mb-3">
        <label htmlFor={props.name} className="form-label">{props.label}</label>
        <textarea 
        name={props.name} 
        className="form-control" 
        required= {props.isRequired ? true:false} 
        value={props.value} 
        onChange={props.onChange}/>
    </div>
  )
}

export default FormTextArea
