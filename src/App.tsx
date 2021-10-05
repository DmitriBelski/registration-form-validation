import 'App.scss'

function App() {
  return (
    <div className="paper">
      <form className="form paper__form">
        <div className="header form__header">
          <h1 className="header__title text-title-regular">Регистрация</h1>
          <span className="header__subtitle text-subtitle-regular">
            Уже есть аккаунт?
            <a className="header__subtitle-link link text-subtitle-accent" href="/" target="_blank">
              Войти
            </a>
          </span>
        </div>
        <label className="input-group form__group" htmlFor="name">
          <span className="input-group__label text-label-regular">Имя</span>
          <input className="input-group__input input text-input" type="text" id="name" placeholder="Введите ваше имя" />
          <span className="input-group__message text-danger" hidden>Введено не корректное значение</span>
        </label>
        <label className="input-group form__group" htmlFor="email">
          <span className="input-group__label text-label-regular">Email</span>
          <input className="input-group__input input text-input" type="email" id="email" placeholder="Введите ваш email" />
          <span className="input-group__message text-danger">Введено не корректное значение</span>
        </label>
        <label className="input-group form__group" htmlFor="cell">
          <span className="input-group__label text-label-regular">Номер телефона</span>
          <input className="input-group__input input text-input" type="tel" id="cell" placeholder="Введите номер телефона" />
          <span className="input-group__message text-danger">Введено не корректное значение</span>
        </label>
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
      </form>
    </div>
  )
}

export default App
