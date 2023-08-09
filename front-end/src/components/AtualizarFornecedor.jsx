import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PhoneInput from './PhoneInput';
import cnpjMask from '../../utils/cnpj_mask';
import { updateSupplier } from '../services/fornecedores_sv';

function AtualizarFornecedor({ ...props }) {
  const {
    supplierToUpdate,
    setSupplierToUpdate,
    showUpdate,
    setShowUpdate,
    getFornecedores,
  } = props;

  const handleClose = () => setShowUpdate(false);

  const handleChange = ({ target: { value, name } }) => {
    setSupplierToUpdate({
      ...supplierToUpdate,
      [name]: value,
    });
  };

  const handleClick = async () => {
    await updateSupplier(supplierToUpdate);

    handleClose();
    getFornecedores();
  };

  return (
    <Modal show={ showUpdate } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>Atualizar Fornecedor</Modal.Title>
      </Modal.Header>
      { !!(supplierToUpdate)
      && (
        <Modal.Body>
          <label>
            Nome
            <input
              name="nome"
              onChange={ handleChange }
              type="text"
              value={ supplierToUpdate.nome }
            />
          </label>
          <label>
            Razão Social
            <input
              name="razao_social"
              onChange={ handleChange }
              type="text"
              value={ supplierToUpdate.razao_social }

            />
          </label>
          <label>
            CNPJ
            <input
              name="cnpj"
              onChange={ handleChange }
              value={ cnpjMask(supplierToUpdate.cnpj) }
              type="text"
            />
          </label>
          <label>
            Email
            <input
              name="email"
              onChange={ handleChange }
              type="text"
              value={ supplierToUpdate.email }
            />
          </label>
          Telefone
          <PhoneInput
            name="telefone"
            pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}"
            onChange={ handleChange }
            type="tel"
            value={ supplierToUpdate.telefone }
          />
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={ () => {
            handleClose();
          } }
        >
          Fechar
        </Button>
        <Button
          variant="primary"
          onClick={ handleClick }
        >
          Atualizar Cadastro
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AtualizarFornecedor.propTypes = {
  showUpdate: PropTypes.bool.isRequired,
  setShowUpdate: PropTypes.func.isRequired,
  getFornecedores: PropTypes.func.isRequired,
  supplierToUpdate: PropTypes.shape({
    cnpj: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    razao_social: PropTypes.string.isRequired,
    telefone: PropTypes.string.isRequired,
  }) || null,
  setSupplierToUpdate: PropTypes.func.isRequired,
};

export default AtualizarFornecedor;
