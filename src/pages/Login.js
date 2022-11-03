import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const MIN_LENGTH_USER = 3;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      enterIsDisabled: true,
      isLoading: false,
      goToSearch: false,
    };
  }

  onUsernameChange = (event) => {
    const { value } = event.target;
    let enterIsDisabled = true;
    if (value.length >= MIN_LENGTH_USER) {
      enterIsDisabled = false;
    }
    this.setState((prevState) => ({
      ...prevState,
      name: event.target.value,
      enterIsDisabled,
    }));
  };

  createUserAndRedirect = async () => {
    const { name } = this.state;

    this.setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    createUser({ name }).then(() => {
      this.setState((prevState) => ({
        ...prevState,
        goToSearch: true,
      }));
    });
  };

  loginPage = (name, enterIsDisabled) => (
    <div className="login-box">
      <div className="login-input">
        <span>Username:</span>
        <input
          value={ name }
          data-testid="login-name-input"
          onChange={ this.onUsernameChange }
        />
      </div>
      <button
        data-testid="login-submit-button"
        type="button"
        disabled={ enterIsDisabled }
        onClick={ this.createUserAndRedirect }
      >
        Entrar
      </button>
    </div>
  );

  render() {
    const { name, enterIsDisabled, isLoading, goToSearch } = this.state;
    return (
      <div className="page-login" data-testid="page-login">
        { isLoading ? <Loading /> : this.loginPage(name, enterIsDisabled) }
        { goToSearch ? <Redirect to="/search" /> : '' }
      </div>
    );
  }
}

export default Login;
