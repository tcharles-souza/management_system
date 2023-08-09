import React from 'react';
import './login.css'; // Importe o arquivo CSS com as regras de estilo

import logo from '../images/logo3.png';

function Login() {
  return (
    <div className="login-page">
      <div className="left-section">
        <img src={ logo } alt="logo" />
      </div>
      <div className="right-section">
        <form>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input type="text" id="username" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" id="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">Entrar</button>
          <div className="register-link">
            <p>
              <a href="#">Cadastrar</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
