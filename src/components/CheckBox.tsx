import * as React from 'react'
import './CheckBox.scss'

interface CheckBoxProps {
  children: React.ReactNode;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <label className="checkbox form__group text-label-regular">
      <input className="checkbox__input" type="checkbox" value="true" onChange={props.onInputChange}/>
      <span className="checkbox__box"></span>
      <span>
        {props.children}
      </span>
    </label>
  )
}

export { CheckBox }
