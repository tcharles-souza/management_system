import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PhoneInput from './PhoneInput';
import cnpjMask from '../../utils/cnpj_mask';
import { insertSupplier } from '../services/fornecedores_sv';

const INITAL_STATE = {
  nome: '',
  razao_social: '',
  cnpj: '',
  email: '',
  telefone: '',
};

function CadastrarFornecedor(props) {
  const { showCadastro, setShowCadastro, getFornecedores } = props;

  const [data, setData] = useState({ ...INITAL_STATE });

  const handleClose = () => setShowCadastro(false);

  const handleChange = ({ target: { value, name } }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleClick = async () => {
    await insertSupplier(data);
    handleClose();
    setData({ ...INITAL_STATE });
    getFornecedores();
  };

  return (
    <Modal show={ showCadastro } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>Cadastrar Fornecedor</Modal.Title>
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
          Razão Social
          <input
            name="razao_social"
            onChange={ handleChange }
            type="text"
          />
        </label>
        <label>
          CNPJ
          <input
            name="cnpj"
            onChange={ handleChange }
            value={ cnpjMask(data.cnpj) }
            type="text"
          />
        </label>
        <label>
          Email
          <input
            name="email"
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

CadastrarFornecedor.propTypes = {
  showCadastro: PropTypes.bool.isRequired,
  setShowCadastro: PropTypes.func.isRequired,
  getFornecedores: PropTypes.func.isRequired,
};

export default CadastrarFornecedor;
