import { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { insertProduct } from '../services/estoque_sv';
import priceMask from '../../utils/price_mask';

const INITAL_STATE = {
  nome: '',
  preco: '0000',
  estoque: 0,
  categoria_id: 1,
  fornecedor_id: 1,
  unidade: 'UN',
};

function CadastrarProduto({ ...props }) {
  const { showCadastro, setShowCadastro, fornecedores, categorias, getEstoque } = props;
  const [data, setData] = useState({ ...INITAL_STATE });

  const handleClose = () => setShowCadastro(false);

  const handleChange = ({ target: { value, name } }) => {
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleClick = async () => {
    await insertProduct(data);
    handleClose();
    setData({ ...INITAL_STATE });
    getEstoque();
  };

  const valueChange = ({ target: { value, name } }) => {
    setData({
      ...data,
      [name]: value.replace(/\D/g, ''),
    });
  };

  return (
    <Modal show={ showCadastro } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>Cadastrar Produto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label>
          Nome do Produto
          <input
            name="nome"
            onChange={ handleChange }
            type="text"
          />
        </label>

        Preço
        <input
          type="text"
          name="preco"
          placeholder="R$ 0.00"
          onChange={ valueChange }
          value={ `R$ ${priceMask(data.preco)}` }
        />
        <label>
          Categoria
          <br />
          <select
            name="categoria_id"
            onChange={ handleChange }
            style={ { width: '215px', height: '30px' } }
          >
            {categorias.map((c) => <option key={ c.id } value={ c.id }>{c.nome}</option>)}
          </select>
        </label>
        <label>
          Quantidade
          <input
            name="estoque"
            onChange={ valueChange }
            value={ data.estoque }
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
          >
            <option value="UN">UN</option>
            <option value="CX">CX</option>
            <option value="OTHER">OTHER</option>
          </select>
        </label>
        <label>
          Fornecedor
          <br />
          <select
            name="fornecedor_id"
            onChange={ handleChange }
            style={ { width: '215px', height: '30px' } }
          >
            {fornecedores.map((f) => (
              <option key={ f.id } value={ f.id }>
                {f.nome}
              </option>)) }
          </select>
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

CadastrarProduto.propTypes = {
  showCadastro: PropTypes.bool.isRequired,
  setShowCadastro: PropTypes.func.isRequired,
  getEstoque: PropTypes.func.isRequired,
  fornecedores: PropTypes.arrayOf(PropTypes.object || undefined),
  categorias: PropTypes.arrayOf(PropTypes.object || undefined),
};

export default CadastrarProduto;
