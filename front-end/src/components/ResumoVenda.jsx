import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';

function ResumoVenda({ ...props }) {
  const { show, setShow, chosenSale } = props;

  const handleClose = () => setShow(false);

  const getTotal = () => chosenSale
    .reduce((acc, curr) => acc + Number(curr.total), 0).toFixed(2);

  return !!(chosenSale[0]) && (
    <Modal show={ show } onHide={ handleClose }>
      <Modal.Header>
        <Modal.Title>{`Venda Cód.: ${chosenSale[0].id_venda}`}</Modal.Title>
      </Modal.Header>
      <table className="table table-borderless">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Produto</th>
            <th scope="col">Preco</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {
            chosenSale.map(({
              id_produto: id,
              descricao,
              quantidade,
              preco,
              total,
            }, i) => (
              <tr key={ `${id}${i}` }>
                <td>{id}</td>
                <td>{descricao}</td>
                <td>{preco}</td>
                <td>{quantidade}</td>
                <td>
                  R$
                  {' '}
                  {total}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Modal.Footer>
        <span
          style={ {
            paddingRight: '115px',
            fontWeight: 'bold',
          } }
        >
          TOTAL
          {' '}
          R$
          {' '}
          {getTotal()}
        </span>
        <Button variant="secondary" onClick={ handleClose }>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ResumoVenda.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  chosenSale: PropTypes.arrayOf(
    PropTypes.shape({
      id_produto: PropTypes.number,
      id_venda: PropTypes.number,
      descricao: PropTypes.string,
      quantidade: PropTypes.number,
      preco: PropTypes.string,
      total: PropTypes.string,
    }),
  ),
};

export default ResumoVenda;
