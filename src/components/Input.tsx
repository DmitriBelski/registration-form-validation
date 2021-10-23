import * as React from 'react'
import { classnames } from 'utils/classnames'
import './Input.scss'

interface InputProps {
  name?: string;
  label?: string;
  inputType: string;
  placeholder?: string;
  validateMessage?: string;
  doValidate?: boolean;
  value?: string;
  autoComplete?: 'on' | 'off';
  readOnly?: boolean;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.LegacyRef<HTMLLabelElement>;
  isRequired?: true;
}

const Input: React.FC<InputProps> = (props) => {
  const [doValidate, setDoValidate] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (props.doValidate) setDoValidate(props.doValidate)
  }, [props.doValidate])

  const labelClass = classnames({
    'input-group__label': true,
    'input-group__label--required': Boolean(props.isRequired)
  })

  return (
    <label className="input-group form__group" ref={props.inputRef}>
      <div className={labelClass}>
        <span className="text-label-regular">{props.label}</span>
      </div>
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
        onBlur={() => setDoValidate(true)}
      />
      <span className="input-group__message text-danger" hidden={!(doValidate && props.validateMessage)}>
        <span className="input-group__message-icon"></span>
        {props.validateMessage}
      </span>
      {props.children}
    </label>
  )
}

export { Input }
