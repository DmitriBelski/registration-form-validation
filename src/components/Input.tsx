import * as React from 'react'
import './Input.scss'

interface InputProps {
  htmlFor?: string;
  label?: string;
  inputType: string;
  placeholder?: string;
  validateMessage?: string;
  requiredMessage?: string;
  children?: React.ReactNode;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <label className="input-group form__group" htmlFor={props.htmlFor}>
      <span className="input-group__label text-label-regular">{props.label}</span>
      <input
        className="input-group__input input text-input"
        type={props.inputType}
        id={props.htmlFor}
        placeholder={props.placeholder}
      />
      <span className="input-group__message text-danger" hidden>
        {props.validateMessage}
      </span>
      {props.children}
    </label>
  )
}

export { Input }
