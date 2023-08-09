import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { insertCliente } from '../services/clientes_sv';
import PhoneInput from './PhoneInput';

const INITAL_STATE = {
  nome: '',
  sobrenome: '',
  endereco: '',
  telefone: '',
  status: 1,
};

function CadastrarCliente(props) {
  const { showCadastro, setShowCadastro, getCustomer } = props;

  const [data, setData] = useState({ ...INITAL_STATE });

  const handleClose = () => setShowCadastro(false);

  const handleChange = ({ target: { value, name } }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleClick = async () => {
    await insertCliente(data);
    handleClose();
    setData({ ...INITAL_STATE });
    getCustomer();
  };

  const togleChange = () => {
    const bool = data.status ? 0 : 1;
    setData({
      ...data,
      status: bool,
    });
  };

  return (
    <Modal show={ showCadastro } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>Cadastrar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>
          Nome
          <input
            name="nome"
            onChange={ handleChange }
            type="text"
          />
        </label>
        <label>
          Sobrenome
          <input
            name="sobrenome"
            onChange={ handleChange }
            type="text"
          />
        </label>
        <label>
          Endereço
          <input
            name="endereco"
            onChange={ handleChange }
            type="text"
          />
        </label>
        Telefone
        <PhoneInput
          name="telefone"
          pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}"
          onChange={ handleChange }
          type="tel"
        />
        <label>
          Cliente ativo
          <input
            name="status"
            onChange={ () => togleChange() }
            checked={ data.status }
            type="checkbox"
          />
        </label>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={ () => {
            handleClose();
            setData({ ...INITAL_STATE });
          } }
        >
          Fechar
        </Button>
        <Button
          variant="primary"
          onClick={ handleClick }
        >
          Finalizar Cadastro
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

CadastrarCliente.propTypes = {
  showCadastro: PropTypes.bool.isRequired,
  setShowCadastro: PropTypes.func.isRequired,
  getCustomer: PropTypes.func.isRequired,
};

export default CadastrarCliente;
