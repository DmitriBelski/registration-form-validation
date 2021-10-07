import * as React from 'react'
import './RegistrationForm.scss'
import { Input } from 'components/Input'
import { Select } from 'components/Select'
import { CheckBox } from 'components/CheckBox'

function RegistrationForm() {
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
        htmlFor="name"
        label="Имя"
        inputType="text"
        placeholder="Введите ваше имя"
        validateMessage="Введено не корректное значение"
      />
      <Input
        htmlFor="email"
        label="Email"
        inputType="email"
        placeholder="Введите ваш email"
        validateMessage="Введено не корректное значение"
      />
      <Input
        htmlFor="cell"
        label="Номер телефона"
        inputType="tel"
        placeholder="Введите номер телефона"
        validateMessage="Введено не корректное значение"
      />
      <Select
        label="Язык"
        inputType="text"
        placeholder="Язык"
        validateMessage="Выберите язык"
      >
      </Select>
      <CheckBox>
        Принимаю&nbsp;
        <a className="link text-label-accent" href="/" target="_blank">условия</a>
        &nbsp;использования
      </CheckBox>
      <button className="button button--disabled text-button-regular text-button-disabled" type="submit">Зарегистрироваться</button>
    </form>
  )
}

export { RegistrationForm }
