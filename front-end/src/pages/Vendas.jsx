import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { getIsoDate } from '../../utils/format_dateTime';
import './venda.css';
import ResumoVenda from '../components/ResumoVenda';

function Vendas() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [chosenSale, setChosenSale] = useState([]);

  const handleChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const clickEvent = async (id) => {
    const response = await fetch(`http://localhost:3001/vendas/${id}`);
    const data = await response.json();
    setChosenSale(data);
    setShow(true);
  };

  useState(() => {
    const getSales = async () => {
      const response = await fetch('http://localhost:3001/vendas');
      const data = await response.json();

      const removeNulls = data.reduce((acc, curr) => {
        curr.codCliente = curr.codCliente || '';
        curr.nomeCliente = curr.nomeCliente || 'Não Informado';
        curr.vendedor = curr.vendedor || 'Não Informado';
        curr.time = getIsoDate(curr.time);
        return [...acc, curr];
      }, []);

      setSales(removeNulls);
    };
    getSales();
  }, []);

  return (
    <div>
      <Form.Control
        id="search-product"
        placeholder="BUSQUE POR CÓD., VENDEDOR, DATA OU CLIENTE"
        type="text"
        name="search"
        value={ search }
        onChange={ handleChange }
      />
      <table className="table table-borderless">
        <thead>
          <tr>
            <th className="th-cod" scope="col">Cód Venda</th>
            <th className="th-vendedor" scope="col">Vendedor</th>
            <th className="th-time" scope="col">Data</th>
            <th className="th-cod" scope="col">Cód Cliente</th>
            <th className="th-cliente" scope="col">Nome Cliente</th>
            <th className="th-total" scope="col">Total</th>
          </tr>
        </thead>
        <tbody className="table-venda">

          {
            sales
              .filter(({ cod,
                nomeCliente,
                time,
                vendedor }) => nomeCliente.toLowerCase().includes(search.toLowerCase())
                || vendedor.toLowerCase().includes(search.toLowerCase())
                || cod.toString().includes(search)
                || time.includes(search))
              .map((sale) => (
                <tr key={ sale.cod } onClick={ () => clickEvent(sale.cod) }>
                  <td>{sale.cod}</td>
                  <td>{sale.vendedor}</td>
                  <td>{sale.time}</td>
                  <td>{sale.codCliente}</td>
                  <td>{sale.nomeCliente}</td>
                  <td>{`R$ ${sale.total}`}</td>
                </tr>

              ))
          }
        </tbody>
      </table>
      <ResumoVenda
        show={ show }
        setShow={ setShow }
        chosenSale={ chosenSale }
      />
    </div>
  );
}

export default Vendas;
