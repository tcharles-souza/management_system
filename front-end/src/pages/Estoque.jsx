import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';

import editSVG from '../images/edit.svg';
import deleteSVG from '../images/x.svg';
import CadastrarProduto from '../components/CadastrarProduto';
import { deleteProduct } from '../services/estoque_sv';
import AtualizarProduto from '../components/AtualizarProduto';

const INITAL_STATE = { estoque: [], categorias: [], fornecedores: [] };

function Estoque() {
  const [data, setData] = useState({ ...INITAL_STATE });
  const [showCadastro, setShowCadastro] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  const getEstoque = async () => {
    const result = await Promise.all([
      fetch('http://localhost:3001/estoque'),
      fetch('http://localhost:3001/categorias'),
      fetch('http://localhost:3001/fornecedores'),
    ]);

    const jsonResults = await Promise.all(result.map((response) => response.json()));

    const [estoque, categorias, fornecedores] = jsonResults;

    setData({ estoque, categorias, fornecedores });
  };

  const editEvent = (el) => {
    const formartEl = {
      ...el,
      categoria: data.categorias.find(({ nome }) => nome === el.categoria).id,
      fornecedor: data.fornecedores.find(({ nome }) => nome === el.fornecedor).id,
    };

    setProductToUpdate({ ...formartEl });
    setShowUpdate(true);
  };

  useEffect(() => {
    getEstoque();
  }, []);

  return (
    <div>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cód. Barras</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Categoria</th>
            <th>Estoque Atual</th>
            <th>Tipo</th>
            <th>Fornecedor</th>
            <th>Editar/Deletar</th>
          </tr>
        </thead>
        <tbody>
          {
            data.estoque.map((el) => (
              <tr key={ el.id }>
                <td>{el.id}</td>
                <td>{el.codigo_de_barras}</td>
                <td>{el.descricao}</td>
                <td>{`R$ ${el.preco || 0}`}</td>
                <td>{el.categoria}</td>
                <td>{el.estoque}</td>
                <td>{el.unidade}</td>
                <td>{el.fornecedor}</td>
                <td>
                  <button
                    className="b1"
                    onClick={ () => {
                      editEvent({ ...el });
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
                      await deleteProduct(el.id);
                      getEstoque();
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
      <CadastrarProduto
        showCadastro={ showCadastro }
        setShowCadastro={ setShowCadastro }
        categorias={ data.categorias }
        fornecedores={ data.fornecedores }
        getEstoque={ getEstoque }
      />
      <AtualizarProduto
        showUpdate={ showUpdate }
        setShowUpdate={ setShowUpdate }
        productToUpdate={ productToUpdate }
        setProductToUpdate={ setProductToUpdate }
        getEstoque={ getEstoque }
        categorias={ data.categorias }
        fornecedores={ data.fornecedores }
      />

      <footer>
        <Button
          onClick={ () => setShowCadastro(true) }
        >
          Cadastrar Produto
        </Button>
      </footer>
    </div>
  );
}

export default Estoque;
