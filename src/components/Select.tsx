import * as React from 'react'
import { Input } from './Input'
import './Select.scss'

interface SelectProps {
  htmlFor?: string;
  label?: string;
  inputType: string;
  placeholder?: string;
  validateMessage?: string;
  requiredMessage?: string;
  children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <Input
      htmlFor={props.htmlFor}
      label={props.label}
      inputType={props.inputType}
      placeholder={props.placeholder}
      validateMessage={props.validateMessage}
    >
      <div className="select">
        <div className="select__dropdown">
          <ul className="select__dropdown-list">
            <li className="select-option select-option--highlighted text-select">Русский</li>
            <li className="select-option text-select">Английский</li>
            <li className="select-option text-select">Китайский</li>
            <li className="select-option text-select">Испанский</li>
            <li className="select-option text-select">Испанский</li>
            <li className="select-option text-select">Испанский</li>
            <li className="select-option select-option--highlighted text-select">Испанский</li>
            <li className="select-option text-select">Испанский</li>
            <li className="select-option text-select">Испанский</li>
            <li className="select-option select-option--highlighted text-select">Испанский</li>
            <li className="select-option select-option--selected text-select">Испанский</li>
          </ul>
        </div>
      </div>
    </Input>
  )
}

export { Select }
