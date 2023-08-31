import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

function ListaClientes({ ...props }) {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('');
  const {
    showCustomers: show,
    setShowCustomers: setShow,
    setChosenCostumer,
  } = props;

  const handleClose = () => setShow(false);

  useEffect(() => {
    const getCostumers = async () => {
      const response = await fetch('http://localhost:3001/clientes');
      const data = await response.json();
      const activeClients = data.filter(({ status }) => status);
      setCustomers(activeClients);
    };
    getCostumers();
  }, []);

  return (
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header>
        <Form.Control
          id="search-product"
          type="text"
          placeholder="BUCAR CLIENTES"
          onChange={ ({ target }) => {
            setFilter(target.value);
          } }
          value={ filter }
        />
      </Modal.Header>
      <table
        className="table table-borderless"
      >
        <thead>
          <tr>
            <th scope="col">Cód</th>
            <th scope="col">Nome</th>
          </tr>
        </thead>
        <tbody
          style={ { cursor: 'pointer' } }
        >
          {
            !!customers.length && customers
              .filter(({ id, nome, sobrenome }) => `${nome
                .toLowerCase()} ${sobrenome.toLowerCase()}`
                .includes(filter.toLocaleLowerCase())
                || id.toString().includes(filter))
              .map((c) => (

                <tr
                  key={ `${c.id}` }
                  onClick={ () => {
                    setChosenCostumer({ ...c });
                    handleClose();
                  } }
                >
                  <td>{c.id}</td>
                  <td>{`${c.nome} ${c.sobrenome}`}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ListaClientes.propTypes = {
  showCustomers: PropTypes.bool,
  setShowCustomers: PropTypes.func,
  setChosenCostumer: PropTypes.func,
};

export default ListaClientes;
