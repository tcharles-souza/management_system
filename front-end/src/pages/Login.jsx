import React, { useContext, useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo3.png';
import { createNewUser } from '../services/register_sv';
import context from '../context/appContext';
import { userAuthentication } from '../services/authentication_sv';

const USER_STATE = { username: '', password: '' };

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [userForm, setUserForm] = useState({ ...USER_STATE });
  const { setUserContext } = useContext(context);
  const [invalid, setInvalid] = useState(false);

  const navigate = useNavigate();

  const registerEvent = async () => {
    await createNewUser(userForm);
    setUserForm({ ...USER_STATE });
    setShowLogin(true);
  };

  const loginEvent = async () => {
    const checkLogin = await userAuthentication(userForm);
    if (!checkLogin) {
      setInvalid(true);
      setUserForm({ ...userForm, password: '' });
      return;
    }
    setUserContext(userForm.username);
    navigate('/caixa');
  };

  const handleChange = ({ target: { name, value } }) => {
    setUserForm({
      ...userForm,
      [name]: value,
    });
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <img src={ logo } alt="logo" />
      </div>

      { showLogin
        && (
          <div className="right-section">
            <div>
              <h2>Login</h2>
              <div className="form-group">
                <label htmlFor="username">Usuário</label>
                <input
                  name="username"
                  onChange={ handleChange }
                  type="text"
                  id="username"
                  className="form-control-login"
                  value={ userForm.username }
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  name="password"
                  onChange={ handleChange }
                  type="password"
                  id="password"
                  className="form-control-login"
                  value={ userForm.password }
                />
              </div>
              {invalid && (
                <p
                  style={ {
                    fontSize: '15px',
                    color: 'red',
                  } }
                >
                  *Os dados estão incorretos
                </p>
              )}
              <button
                onClick={ loginEvent }
                className="btn btn-primary"
              >
                Entrar
              </button>
              <div className="register-link">
                <button
                  onClick={ () => {
                    setInvalid(false);
                    setShowLogin(false);
                  } }
                  className="btn btn-link"
                >
                  Cadastrar
                </button>

              </div>
            </div>
          </div>
        )}

      { !showLogin
        && (
          <div className="right-section">
            <div>
              <h2>Cadastro</h2>
              <div className="form-group">
                <label htmlFor="username">Novo usuário</label>
                <input
                  name="username"
                  type="text"
                  id="username"
                  className="form-control-login"
                  onChange={ handleChange }
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  name="password"
                  type="password"
                  id="password"
                  className="form-control-login"
                  onChange={ handleChange }
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={ registerEvent }
              >
                Finalizar Cadastro
              </button>
              <div className="register-link">
                <button
                  onClick={ () => setShowLogin(true) }
                  className="btn btn-link"
                >
                  Voltar
                </button>

              </div>
            </div>
          </div>
        )}

    </div>
  );
}

export default Login;
