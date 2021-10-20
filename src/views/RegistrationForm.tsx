import * as React from 'react'
import './RegistrationForm.scss'
import { Select } from 'components/Select'
import { CheckBox } from 'components/CheckBox'
import { Input } from 'components/Input'
import { Name, Email, Phone, Required, validationMessages } from 'validation/validation'
import { classnames } from 'utils/classnames'
import { Bind } from 'utils/bind'
import Option from 'components/Option'

interface RegistrationFormState {
  name: string,
  email: string,
  phone: string,
  language: string,
  agreement: boolean,
}

class RegistrationForm extends React.Component<{}, RegistrationFormState> {
  constructor(props: any) {
    super(props)
    this.state = {
      name: '',
      email: '',
      phone: '',
      language: '',
      agreement: false
    }
  }

  @Bind
  handleCheckboxChange() {
    this.setState((prevState) => {
      const agreement = !prevState.agreement
      return { agreement }
    })
  }

  /* @Rule(state.prop, message) */
  @Required('agreement', '')
  @Name('name', 'Введено не корректное значение для имени')
  @Required('name', 'Поле имя не может быть пустым')
  @Email('email', 'Введено не корректное значение для email')
  @Required('email', 'Поле email не может быть пустым')
  @Phone('phone', 'Введено не корректное значение для номера телефона')
  @Required('phone', 'Поле номер телефона не может быть пустым')
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
          <span className="header__subtitle text-subtitle-regular">
            Уже есть аккаунт?
            <a className="header__subtitle-link link text-subtitle-accent" href="/" target="_blank">
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
          onInputChange={(event) => this.setState({ name: event.target.value })}
          value={this.state.name}
        />
        <Input
          name="email"
          label="Email"
          inputType="email"
          placeholder="Введите ваш email"
          validateMessage={messages?.email}
          onInputChange={(event) => this.setState({ email: event.target.value })}
          value={this.state.email}
        />
        <Input
          name="phone"
          label="Номер телефона"
          inputType="tel"
          placeholder="Введите номер телефона"
          validateMessage={messages?.phone}
          onInputChange={(event) => this.setState({ phone: String(event.target.value) })}
          value={this.state.phone}
        />
        <Select
          name="language"
          label="Язык"
          inputType="text"
          placeholder="Язык"
          validateMessage="Выберите язык"
        >
        </Select>
        <CheckBox
          onInputChange={this.handleCheckboxChange}
        >
          Принимаю&nbsp;
          <a className="link text-label-accent" href="/" target="_blank">условия</a>
          &nbsp;использования
        </CheckBox>
        <button className={buttonClass} type="submit">Зарегистрироваться</button>
      </form>
    )
  }
}

export { RegistrationForm }
