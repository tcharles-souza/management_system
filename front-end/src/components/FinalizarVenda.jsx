import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';

function FinalizarVenda({ ...props }) {
  const {
    showSale,
    setShowSale,
    cashier,
    fullPrice,
    getTotal,
  } = props;
  // const [finalSale, setFinalSale] = useState([]);
  const handleClose = () => setShowSale(false);

  useEffect(() => {
  }, []);

  return (
    <Modal show={ showSale } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>Finalizar Venda</Modal.Title>
      </Modal.Header>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Preço</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {
            cashier.map(({ nome, quantidade, preco, id }, i) => (

              <tr key={ `${id}${i}` }>
                <td>{nome}</td>
                <td>{quantidade}</td>
                <td>{preco}</td>
                <td>{getTotal(quantidade, preco)}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div
        style={ {
          textAlign: 'end',
          paddingRight: '20px',
          fontWeight: 'bold',
          fontSize: '20px',
        } }
      >
        TOTAL
        {' '}
        R$
        {' '}
        {fullPrice}
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={ handleClose }>
          Cancelar
        </Button>
        <Button variant="primary" onClick={ handleClose }>
          Concuir
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

FinalizarVenda.propTypes = {
  showSale: PropTypes.bool,
  setShowSale: PropTypes.func,
  cashier: PropTypes.arrayOf(
    PropTypes.shape({
      nome: PropTypes.string,
      quantidade: PropTypes.string,
      preco: PropTypes.string,
    }),
  ),
  fullPrice: PropTypes.string,
  getTotal: PropTypes.func,
};

export default FinalizarVenda;
