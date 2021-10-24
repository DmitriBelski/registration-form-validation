import * as React from 'react'
import './CheckBox.scss'

interface CheckBoxProps {
  children: React.ReactNode;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <label className="checkbox form__group">
      <input className="checkbox__input" type="checkbox" value="true" onChange={props.onInputChange}/>
      <span className="checkbox__box"></span>
      <span className="text-label">
        {props.children}
      </span>
    </label>
  )
}

export { CheckBox }
