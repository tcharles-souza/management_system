import { Link } from 'react-router-dom';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Button from 'react-bootstrap/esm/Button';
import { useContext } from 'react';
import context from '../context/appContext';

function Header() {
  const { user } = useContext(context);

  return (
    <ModalHeader className="header sticky-container">
      <span>
        Operador:
        {' '}
        {user}
      </span>
      <div>
        <Link to="caixa"><Button className="header_btn">Caixa</Button></Link>
        <Link to="vendas"><Button className="header_btn">Vendas</Button></Link>
        <Link to="clientes"><Button className="header_btn">Clientes</Button></Link>
        <Link to="estoque"><Button className="header_btn">Estoque</Button></Link>
        <Link to="fornecedores">
          <Button className="header_btn">Fornecedores</Button>
        </Link>
      </div>
    </ModalHeader>
  );
}

export default Header;
