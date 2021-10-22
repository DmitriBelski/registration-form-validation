import * as React from 'react'
import './Input.scss'

interface InputProps {
  name?: string;
  label?: string;
  inputType: string;
  placeholder?: string;
  validateMessage?: string;
  value?: string;
  autoComplete?: 'on' | 'off';
  readOnly?: boolean;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <label className="input-group form__group">
      <span className="input-group__label text-label-regular">{props.label}</span>
      <input
        className="input-group__input input text-input"
        name={props.name}
        type={props.inputType}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onInputChange}
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        readOnly={props.readOnly}
        autoComplete={props.autoComplete}
      />
      <span className="input-group__message text-danger" hidden={!props.validateMessage}>
        {props.validateMessage}
      </span>
      {props.children}
    </label>
  )
}

export { Input }
