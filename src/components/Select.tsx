import * as React from 'react'
import { classnames } from 'utils/classnames'
import { Input } from './Input'
import './Select.scss'

interface SelectProps {
  name?: string;
  label?: string;
  placeholder?: string;
  validateMessage?: string;
  requiredMessage?: string;
  children?: React.ReactNode;
}

const Select: React.FC<SelectProps> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const dropdownClass = classnames({
    select: true,
    'select--open': isOpen
  })

  return (
    <Input
      name={props.name}
      label={props.label}
      inputType="text"
      inputType={props.inputType}
      placeholder={props.placeholder}
      validateMessage={props.validateMessage}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className={dropdownClass}>
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
