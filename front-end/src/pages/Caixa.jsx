import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ProdutosCaixa from '../components/ProdutosCaixa';
import { normalizeText } from '../../utils/normalize_text';

import trash from '../images/trash-2.svg';
import FinalizarVenda from '../components/FinalizarVenda';
import ListaClientes from '../components/ListaClientes';

function Caixa() {
  const [products, setProducts] = useState([]);
  const [cashier, setCashier] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [showSale, setShowSale] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);
  const [input, setInput] = useState('');
  const [fullPrice, setFullPrice] = useState(0);
  const [choseCostumer, setChosenCostumer] = useState(null);

  const getProducts = async () => {
    const result = await fetch('http://localhost:3001/estoque');
    const data = await result.json();

    setProducts([...data]);
  };

  const addProduct = (value) => {
    const search = products
      .filter((p) => p.nome.includes(value) || p.id.toString().includes(value));

    if (search.length === 1) {
      search[0].quantidade = '1';

      setCashier([...cashier, ...search]);
      setInput('');
      return;
    }
    setShowSearch(true);
  };

  const handleChange = ({ target: { value } }) => {
    setInput(normalizeText(value));
  };

  const handleKeyEvent = ({ target: { value }, keyCode }) => {
    const ENTER_CODE = 13;
    if (ENTER_CODE === keyCode) addProduct(value);
  };

  const valueChange = ({ target: { value } }, i) => {
    value = value.replace(/[+-]/g, '');

    const convert = Number(value);

    const { estoque } = cashier[i];

    const num = estoque < convert ? estoque : convert;

    cashier[i] = { ...cashier[i], quantidade: num.toString() };

    setCashier([...cashier]);
  };

  const deleteEvent = (index) => {
    cashier.splice(index, 1);
    setCashier([...cashier]);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const getFullPrice = () => cashier.reduce(
      (acc, { quantidade: a, preco: b }) => acc + Number(a) * Number(b),
      0,
    );

    setFullPrice(getFullPrice().toFixed(2));
  }, [cashier]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        setShowSale(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const getTotal = (a, b) => (Number(a) * Number(b)).toFixed(2);
  console.log(cashier);
  return (
    <div>
      <Form.Control
        id="search-product"
        placeholder="CÓD. OU NOME DO PRODUTO"
        type="text"
        onChange={ handleChange }
        value={ input }
        onKeyDown={ handleKeyEvent }
      />
      <h1>CAIXA</h1>

      <table className="table table-borderless">
        <thead>
          <tr>
            <th className="td-cod" scope="col">Cód</th>
            <th className="td-produto" scope="col">Produto</th>
            <th className="td-preco" scope="col">Preço</th>
            <th className="td-quantidade" scope="col">Quantidade</th>
            <th className="td-total" scope="col">Total</th>
            <th className="td-delete" scope="col">{' '}</th>
          </tr>
        </thead>
        <tbody>
          {
            cashier
              .map(({ nome, id, preco, quantidade }, i) => (
                <tr key={ `${id}${nome}${i}` }>
                  <th scope="row" className="td-cod">{id}</th>
                  <td className="td-produto">{nome}</td>
                  <td className="td-preco">{`R$ ${preco}`}</td>
                  <td className="td-quantidade">
                    <Form.Control
                      className="custom-width"
                      type="number"
                      htmlSize={ 30 }
                      value={ quantidade }
                      onChange={ (e) => valueChange(e, i) }
                    />
                  </td>
                  <td className="td-total">
                    R$
                    {' '}
                    {getTotal(quantidade, preco)}
                  </td>
                  <td className="td-delete">
                    <button
                      className="b1"
                      onClick={ () => deleteEvent(i) }
                    >
                      <img src={ trash } alt="delete" />
                    </button>

                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <footer>
        <div className="cashier-btn">
          <ProdutosCaixa
            showSearch={ showSearch }
            setShowSearch={ setShowSearch }
            products={ products }
            addProduct={ addProduct }
            input={ input }
            setInput={ setInput }
          />
          <Button
            variant="primary"
            onClick={ () => setShowSale(true) }
            style={ { marginLeft: '5px' } }
            disabled={ !cashier.length }
          >
            FINALIZAR VENDA
          </Button>

          <FinalizarVenda
            showSale={ showSale }
            setShowSale={ setShowSale }
            cashier={ cashier }
            fullPrice={ fullPrice }
            getTotal={ getTotal }
          />

          <button
            style={ {
              marginLeft: '30px',
            } }
            className="b1"
            onClick={ () => setShowCustomers(true) }
          >
            {
              choseCostumer
                ? (
                  <span>
                    {' '}
                    Cliente:
                    {' '}
                    {choseCostumer.nome}
                    {' '}
                    {choseCostumer.sobrenome}
                  </span>
                )
                : (
                  <p
                    style={ {
                      textDecoration: 'underline black',
                      margin: '0' } }
                  >
                    Informar Cliente

                  </p>
                )
            }
          </button>

          <ListaClientes
            showCustomers={ showCustomers }
            setShowCustomers={ setShowCustomers }
            setChosenCostumer={ setChosenCostumer }
          />
        </div>
        <div className="right-elements">
          <h3 className="cashier-total-text">TOTAL</h3>
          <h3 className="cashier-total">{`R$ ${fullPrice}`}</h3>
        </div>

      </footer>
    </div>
  );
}

export default Caixa;
