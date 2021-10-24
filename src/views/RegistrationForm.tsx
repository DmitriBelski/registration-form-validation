import * as React from 'react'
import './RegistrationForm.scss'
import { Select } from 'components/Select'
import { CheckBox } from 'components/CheckBox'
import { Input } from 'components/Input'
import { Name, Email, Phone, Required, validationMessages } from 'validation/validation'
import { classnames } from 'utils/classnames'
import { Bind } from 'utils/bind'
import { languages } from 'utils/constant'
import Option from 'components/Option'
import { parsePhone } from 'utils/parsephone'

interface RegistrationFormState {
  name: string,
  email: string,
  phone: string,
  language: string,
  agreement: boolean,
  triedSubmitted: boolean
}

class RegistrationForm extends React.Component<{}, RegistrationFormState> {
  constructor(props: any) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      language: '',
      agreement: false,
      triedSubmitted: false
    }
  }

  @Bind
  handleCheckboxChange() {
    this.setState((prevState) => {
      const agreement = !prevState.agreement
      return { agreement }
    })
  }

  @Bind
  submitHandler(event: React.FormEvent, valid: boolean) {
    event.preventDefault()
    if (valid) {
      console.log(
        'name:', this.state.name,
        '\nemail:', this.state.email,
        '\nphone:', parsePhone(this.state.phone),
        '\nlanguage:', this.state.language
      )
    } else {
      this.setState({ triedSubmitted: true })
    }
  }

  /* @Rule(state.prop, message) */
  @Required('agreement', '')
  @Required('language', 'Выберите язык')
  @Name('name', 'Введено не корректное имя')
  @Required('name', 'Поле имя не может быть пустым')
  @Email('email', 'Введен не корректный email')
  @Required('email', 'Поле email не может быть пустым')
  @Phone('phone', 'Введен не корректный номера телефона')
  @Required('phone', 'Укажите номер телефона')
  render() {
    const messages = validationMessages(this)
    const valid = !messages

    const buttonClass = classnames({
      button: true,
      'button--disabled': !valid,
      'text-button-regular': valid,
      'text-button-disabled': !valid
    })

    return (
      <form className="form">
        <div className="header form__header">
          <h1 className="header__title text-title-regular">Регистрация</h1>
          <span className="header__subtitle text-subtitle">
            Уже есть аккаунт?
            <a className="header__subtitle-link link" href="/" target="_blank">
              Войти
            </a>
          </span>
        </div>
        <Input
          name="name"
          label="Имя"
          inputType="text"
          placeholder="Введите ваше имя"
          validateMessage={messages?.name}
          doValidate={this.state.triedSubmitted}
          onInputChange={(event) => this.setState({ name: event.target.value })}
          value={this.state.name}
          isRequired
        />
        <Input
          name="email"
          label="Email"
          inputType="email"
          placeholder="Введите ваш email"
          validateMessage={messages?.email}
          doValidate={this.state.triedSubmitted}
          onInputChange={(event) => this.setState({ email: event.target.value })}
          value={this.state.email}
          isRequired
        />
        <Input
          name="phone"
          label="Номер телефона"
          inputType="tel"
          placeholder="Введите номер телефона"
          validateMessage={messages?.phone}
          doValidate={this.state.triedSubmitted}
          onInputChange={(event) => this.setState({ phone: String(event.target.value) })}
          value={this.state.phone}
          isRequired
        />
        <Select
          name="language"
          label="Язык"
          placeholder="Язык"
          validateMessage={messages?.language}
          doValidate={this.state.triedSubmitted}
          value={this.state.language ?? ''}
          onOptionClick={(language) => this.setState({ language })}
          isRequired
        >
          {languages.map((language) => <Option key={language.code} value={language.value}>{language.value}</Option>)}
        </Select>
        <CheckBox
          onInputChange={this.handleCheckboxChange}
        >
          Принимаю&nbsp;
          <a className="link" href="/" target="_blank">условия</a>
          &nbsp;использования
        </CheckBox>
        <button className={buttonClass} type="submit" onClick={(event) => this.submitHandler(event, valid)}>Зарегистрироваться</button>
      </form>
    )
  }
}

export { RegistrationForm }
