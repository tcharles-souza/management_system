import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

import priceMask from '../../utils/price_mask';
import { updateProduct } from '../services/estoque_sv';

const INITAL_STATE = {
  nome: '',
  preco: '0000',
  estoque: 0,
  categoria: '',
  fornecedor: '',
  unidade: 'UN',
};

function AtualizarProduto(props) {
  const { showUpdate,
    setShowUpdate,
    productToUpdate,
    setProductToUpdate,
    getEstoque,
    categorias,
    fornecedores,
  } = props;

  const handleClose = () => setShowUpdate(false);

  const handleChange = ({ target: { value, name } }) => {
    setProductToUpdate({
      ...productToUpdate,
      [name]: value,
    });
  };

  const valueChange = ({ target: { value, name } }) => {
    setProductToUpdate({
      ...productToUpdate,
      [name]: value.replace(/\D/g, ''),
    });
  };

  const handleClick = async () => {
    await updateProduct(productToUpdate);
    setShowUpdate(false);
    setProductToUpdate({ ...INITAL_STATE });
    getEstoque();
  };
  return (
    <Modal show={ showUpdate } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>Atualizar Produto</Modal.Title>
      </Modal.Header>
      { !!(productToUpdate) && (
        <Modal.Body>
          <label>
            Nome do Produto
            <input
              name="nome"
              onChange={ handleChange }
              type="text"
              value={ productToUpdate.nome }
            />
          </label>

          Preço
          <input
            type="text"
            name="preco"
            placeholder="R$ 0.00"
            onChange={ valueChange }
            value={ `R$ ${priceMask(productToUpdate.preco)}` }
          />
          <label>
            Categoria
            <br />
            <select
              name="categoria"
              onChange={ handleChange }
              style={ { width: '215px', height: '30px' } }
              defaultValue={ productToUpdate.categoria }
            >
              {categorias.map((c) => (
                <option
                  key={ c.id }
                  value={ c.id }
                >
                  {c.nome}
                </option>
              ))}
            </select>
          </label>
          <label>
            Quantidade
            <input
              name="estoque"
              onChange={ valueChange }
              value={ productToUpdate.estoque }
              type="text"
            />
          </label>
          <label>
            Tipo
            <br />
            <select
              onChange={ handleChange }
              name="unidade"
              style={ { width: '215px', height: '30px' } }
              defaultValue={ productToUpdate.unidade }
            >
              <option
                value="UN"
              >
                UN

              </option>
              <option
                value="CX"
              >
                CX

              </option>
              <option
                value="OTHER"
              >
                OTHER

              </option>
            </select>
          </label>
          <label>
            Fornecedor
            <br />
            <select
              name="fornecedor"
              onChange={ handleChange }
              style={ { width: '215px', height: '30px' } }
              defaultValue={ productToUpdate.fornecedor }
            >
              {fornecedores.map((f) => (
                <option
                  key={ f.id }
                  value={ f.id }
                >
                  {f.nome}
                </option>)) }
            </select>
          </label>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={ () => {
            setShowUpdate(false);
            setProductToUpdate({ ...INITAL_STATE });
          } }
        >
          Fechar
        </Button>
        <Button
          variant="primary"
          onClick={ handleClick }
        >
          Atualizar Produto
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AtualizarProduto.propTypes = {
  showUpdate: PropTypes.bool.isRequired,
  setShowUpdate: PropTypes.func.isRequired,
  productToUpdate: PropTypes.shape({
    nome: PropTypes.string,
    sobrenome: PropTypes.string,
    endereço: PropTypes.string,
    telefone: PropTypes.string,
    status: PropTypes.number,
    id: PropTypes.number,
  }) }.isrequired;

export default AtualizarProduto;
