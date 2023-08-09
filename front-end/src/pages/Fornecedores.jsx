import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import deleteSVG from '../images/x.svg';
import editSVG from '../images/edit-2.svg';
import CadastrarFornecedor from '../components/CadastrarFornecedor';
import { deleteSupplier } from '../services/fornecedores_sv';
import AtualizarFornecedor from '../components/AtualizarFornecedor';

function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [showCadastro, setShowCadastro] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [supplierToUpdate, setSupplierToUpdate] = useState(null);

  const getFornecedores = async () => {
    const response = await fetch('http://localhost:3001/fornecedores');
    const data = await response.json();

    setFornecedores(data);
  };

  useEffect(() => {
    getFornecedores();
  }, []);

  return (
    <div>
      {
        !!(fornecedores.length) && (
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Razão Social</th>
                <th>CNPJ</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Editar/Deletar</th>
              </tr>
            </thead>
            <tbody>
              {
                fornecedores.map((el) => (
                  <tr key={ el.id }>
                    <td>{el.id}</td>
                    <td>{el.nome}</td>
                    <td>{el.razao_social}</td>
                    <td>{el.cnpj}</td>
                    <td>{el.email}</td>
                    <td>{el.telefone}</td>
                    <td>
                      <button
                        className="b1"
                        onClick={ () => {
                          setShowUpdate(true);
                          setSupplierToUpdate({ ...el });
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
                          await deleteSupplier(el.id);
                          getFornecedores();
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
        )
      }

      <CadastrarFornecedor
        showCadastro={ showCadastro }
        setShowCadastro={ setShowCadastro }
        getFornecedores={ getFornecedores }
      />

      <AtualizarFornecedor
        showUpdate={ showUpdate }
        supplierToUpdate={ supplierToUpdate }
        setShowUpdate={ setShowUpdate }
        getFornecedores={ getFornecedores }
        setSupplierToUpdate={ setSupplierToUpdate }
      />

      <footer>
        <Button
          onClick={ () => setShowCadastro(true) }
        >
          Cadastrar Fornecedor
        </Button>
      </footer>
    </div>
  );
}

export default Fornecedores;
