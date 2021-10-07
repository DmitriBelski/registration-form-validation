import * as React from 'react'
import './RegistrationForm.scss'
import { Input } from 'components/Input'

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
      <label className="input-group form__group" htmlFor="language">
        <span className="input-group__label text-label-regular">Язык</span>
        <input className="input-group__input input text-input" type="text" id="language" placeholder="Язык"/>
        <span className="input-group__message text-danger">Выберите язык</span>
        <div className="select select--open">
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
      </label>
      <label className="checkbox form__group text-label-regular">
        <input className="checkbox__input" type="checkbox" value="true"/>
        <span className="checkbox__box"></span>
        <span>
          Принимаю&nbsp;
          <a className="link text-label-accent" href="/" target="_blank">условия</a>
          &nbsp;использования
        </span>
      </label>
      <button className="button button--disabled text-button-regular text-button-disabled" type="submit">Зарегистрироваться</button>
    </form>
  )
}

export { RegistrationForm }
