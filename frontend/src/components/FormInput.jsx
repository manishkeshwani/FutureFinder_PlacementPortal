import React from 'react'

const FormInput = (props) => {
  return (
    <div className="mb-3">
        <label htmlFor={props.name} className="form-label">{props.label}</label>
        <div className="form-text mb-1 mt-0">{props.information}</div>
        <input 
        type={props.type}
        name={props.name} 
        className="form-control" 
        required= {props.isRequired ? true:false} 
        value={props.value} 
        placeholder={props.placeholder}
        onChange={props.onChange}
        accept={props.type==="file" ? props.accept:""}
        disabled = {props.isDisabled ? true:false}
        />
    </div>
  )
}

export default FormInput;