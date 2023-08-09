import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import { updateCliente } from '../services/clientes_sv';
import PhoneInput from './PhoneInput';

const INITAL_STATE = {
  nome: '',
  sobrenome: '',
  endereco: '',
  telefone: '',
  status: 1,
};

function AtualizarCliente(props) {
  const { showUpdate,
    setShowUpdate,
    costumerToUpdate,
    setCostumerToUpdate,
    getCustomer,
  } = props;

  const handleClose = () => setShowUpdate(false);

  const handleChange = ({ target: { value, name } }) => {
    setCostumerToUpdate({
      ...costumerToUpdate,
      [name]: value,
    });
  };

  const togleChange = () => {
    const bool = costumerToUpdate.status ? 0 : 1;
    setCostumerToUpdate({
      ...costumerToUpdate,
      status: bool,
    });
  };

  return (
    <Modal show={ showUpdate } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>Atualizar Cadastro</Modal.Title>
      </Modal.Header>
      { !!(costumerToUpdate) && (
        <Modal.Body>
          <label>
            Nome
            <input
              name="nome"
              onChange={ handleChange }
              type="text"
              value={ costumerToUpdate.nome }
            />
          </label>
          <label>
            Sobrenome
            <input
              name="sobrenome"
              onChange={ handleChange }
              type="text"
              value={ costumerToUpdate.sobrenome }
            />
          </label>
          <label>
            Endereço
            <input
              name="endereco"
              onChange={ handleChange }
              type="text"
              value={ costumerToUpdate.endereco }
            />
          </label>
          Telefone
          <PhoneInput
            name="telefone"
            pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}"
            onChange={ handleChange }
            type="tel"
            value={ costumerToUpdate.telefone }
          />
          <label>
            Cliente ativo
            <input
              name="status"
              onChange={ () => togleChange() }
              checked={ costumerToUpdate.status }
              type="checkbox"
            />
          </label>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={ () => {
            setShowUpdate(false);
            setCostumerToUpdate({ ...INITAL_STATE });
          } }
        >
          Fechar
        </Button>
        <Button
          variant="primary"
          onClick={ async () => {
            await updateCliente(costumerToUpdate);
            setShowUpdate(false);
            setCostumerToUpdate({ ...INITAL_STATE });
            getCustomer();
          } }
        >
          Atualizar Cadastro
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AtualizarCliente.propTypes = {
  showUpdate: PropTypes.bool.isRequired,
  setShowUpdate: PropTypes.func.isRequired,
  costumerToUpdate: PropTypes.shape({
    nome: PropTypes.string,
    sobrenome: PropTypes.string,
    endereço: PropTypes.string,
    telefone: PropTypes.string,
    status: PropTypes.number,
    id: PropTypes.number,
  }) }.isrequired;

export default AtualizarCliente;
