import * as React from 'react'
import './Input.scss'

interface InputProps {
  name?: string;
  label?: string;
  inputType: string;
  placeholder?: string;
  validateMessage?: string;
  value?: string;
  onInputChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

class Input extends React.Component<InputProps> {
  render() {
    return (
      <label className="input-group form__group">
        <span className="input-group__label text-label-regular">{this.props.label}</span>
        <input
          className="input-group__input input text-input"
          name={this.props.name}
          type={this.props.inputType}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onInputChange}
        />
        <span className="input-group__message text-danger" hidden={!this.props.validateMessage}>
          {this.props.validateMessage}
        </span>
        {this.props.children}
      </label>
    )
  }
}

export { Input }