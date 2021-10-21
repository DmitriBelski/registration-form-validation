import * as React from 'react'
import { classnames } from 'utils/classnames'
import './Option.scss'

export interface OptionProps {
  onClick?: (value: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
  onHover?: () => void;
  onRef?: (ref: HTMLLIElement) => void;
  isSelected?: boolean;
  isHighlighted?: boolean;
  value: string;
}

export const isOption = (node: React.ReactNode): node is React.FunctionComponentElement<OptionProps> => {
  return true
}

const Option: React.FC<OptionProps> = (props) => {
  const optionClass = classnames({
    'select-option': true,
    'text-select': true,
    'select-option--selected': Boolean(props.isSelected),
    'select-option--highlighted': Boolean(props.isHighlighted && !props.isSelected)
  })

  return (
    <li className={optionClass}
      ref={props.onRef}
      onClick={props.onClick}
      onMouseEnter={props.onHover}
    >
      {props.children}
    </li>
  )
}

export default Option
