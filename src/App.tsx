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
      </form>
    </div>
  )
}

export default App
