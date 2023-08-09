import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ProdutosCaixa from '../components/ProdutosCaixa';
import { normalizeText } from '../../utils/normalize_text';

import trash from '../images/trash-2.svg';

function Caixa() {
  const [products, setProducts] = useState([]);
  const [cashier, setCashier] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [input, setInput] = useState('');
  const [fullPrice, setFullPrice] = useState(0);

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
    // cashier.forEach((e, i) => console.log(e, i));
    setFullPrice(getFullPrice().toFixed(2));
  }, [cashier]);

  const getTotal = (a, b) => (Number(a) * Number(b)).toFixed(2);

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
            <th scope="col">Cód</th>
            <th scope="col">Produto</th>
            <th scope="col">Preço</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Total</th>
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

        <ProdutosCaixa
          className="cashier-btn"
          showSearch={ showSearch }
          setShowSearch={ setShowSearch }
          products={ products }
          addProduct={ addProduct }
          input={ input }
          setInput={ setInput }
        />
        <div className="right-elements">
          <h3 className="cashier-total-text">TOTAL</h3>
          <h3 className="cashier-total">{`R$ ${fullPrice}`}</h3>
        </div>

      </footer>
    </div>
  );
}

export default Caixa;
