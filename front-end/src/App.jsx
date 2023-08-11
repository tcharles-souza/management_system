// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import './app.css';
import Caixa from './pages/Caixa';
import Header from './components/Header';
import Clientes from './pages/Clientes';
import Estoque from './pages/Estoque';
import Fornecedores from './pages/Fornecedores';
import AppProvider from './context/AppProvider';

function App() {
  const { pathname } = useLocation();

  return (
    <AppProvider>
      {pathname !== '/' && <Header />}
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/caixa" element={ <Caixa /> } />
        <Route path="/clientes" element={ <Clientes /> } />
        <Route path="/estoque" element={ <Estoque /> } />
        <Route path="/fornecedores" element={ <Fornecedores /> } />
      </Routes>
    </AppProvider>
  );
}

export default App;
