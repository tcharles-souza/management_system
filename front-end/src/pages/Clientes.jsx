import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import CadastrarCliente from '../components/CadastrarCliente';
import AtualizarCliente from '../components/AtualizarCliente';
import deleteSVG from '../images/x.svg';
import editSVG from '../images/edit-2.svg';
import activeSVG from '../images/user-check.svg';
import inactiveSVG from '../images/user-x.svg';
import { deleteCliente } from '../services/clientes_sv';

function Clientes() {
  const [customers, setCustomers] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);

  const [showUpdate, setShowUpdate] = useState(false);

  const [costumerToUpdate, setCostumerToUpdate] = useState(null);

  const getCustomer = async () => {
    const response = await fetch('http://localhost:3001/clientes');
    const result = await response.json();

    setCustomers(result);
  };

  useEffect(() => {
    getCustomer();
  }, []);

  return (
    <>
      { !!(customers.length) && (
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Sobrenome</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Editar/Deletar</th>
            </tr>
          </thead>
          <tbody>
            {
              customers.map((el) => (
                <tr key={ el.id }>
                  <td>{el.id}</td>
                  <td>{el.nome}</td>
                  <td>{el.sobrenome}</td>
                  <td>{el.endereco}</td>
                  <td>{el.telefone}</td>
                  <td>
                    {parseInt(el.status, 10) ? (<img src={ activeSVG } alt="Active" />)
                      : (<img src={ inactiveSVG } alt="Inactive" />)}

                  </td>
                  <td>
                    <button
                      className="b1"
                      onClick={ () => {
                        setShowUpdate(true);
                        setCostumerToUpdate({ ...el });
                      } }
                    >
                      <img
                        src={ editSVG }
                        alt="editar"
                        name="editar"
                      />

                    </button>
                    <button
                      className="b1"
                      onClick={ async () => {
                        await deleteCliente(el.id);
                        getCustomer();
                      } }
                    >
                      <img
                        name="excluir"
                        src={ deleteSVG }
                        alt="exlcuir"
                      />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )}

      {!customers.length && <span>O sistema não possui clientes cadastrados</span>}

      <br />

      <AtualizarCliente
        showUpdate={ showUpdate }
        setShowUpdate={ setShowUpdate }
        costumerToUpdate={ costumerToUpdate }
        setCostumerToUpdate={ setCostumerToUpdate }
        getCustomer={ getCustomer }
      />
      <footer>
        <Button
          onClick={ () => setShowCadastro(true) }
        >
          Cadastrar Cliente
        </Button>
        <CadastrarCliente
          className="cashier-btn"
          showCadastro={ showCadastro }
          setShowCadastro={ setShowCadastro }
          getCustomer={ getCustomer }
        />
      </footer>
    </>
  );
}

export default Clientes;
