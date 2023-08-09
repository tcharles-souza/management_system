import { Link } from 'react-router-dom';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import Button from 'react-bootstrap/esm/Button';

function Header() {
  return (
    <ModalHeader className="header sticky-container">
      <span>Nome do Usuário</span>
      <div>
        <Link to="caixa"><Button className="header_btn">Caixa</Button></Link>
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
