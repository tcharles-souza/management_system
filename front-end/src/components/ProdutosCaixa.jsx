/* eslint-disable react/prop-types */
import { Form, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { normalizeText } from '../../utils/normalize_text';

function ProdutosCaixa({ ...props }) {
  const {
    showSearch: show,
    setShowSearch: setShow,
    products,
    addProduct,
    input,
    setInput,
  } = props;

  const handleClose = () => setShow(false);

  const handleChange = ({ target: { value } }) => {
    const formatedText = normalizeText(value);
    setInput(formatedText);
  };

  return (
    <>
      <Button variant="primary" onClick={ () => addProduct('') }>
        TODOS OS PRODUTOS
      </Button>

      <Modal show={ show } onHide={ handleClose } animation={ false }>
        <Modal.Header>
          <Form.Control
            id="search-product"
            type="text"
            placeholder="BUSCAR PRODUTOS"
            onChange={ handleChange }
            value={ input }
          />
        </Modal.Header>

        <Modal.Body>
          <ListGroup>
            {
              products
                .filter(({ descricao, id, codigo_de_barras: barCode }) => descricao
                  .includes(input)
                  || id.toString().includes(input)
                  || barCode.includes(input))
                .map((p, i) => (
                  <ListGroup.Item
                    className="search-list"
                    style={ { cursor: 'pointer' } }
                    key={ i + p.descricao }
                    onClick={ () => {
                      addProduct(p.descricao);
                      setInput('');
                      handleClose();
                    } }
                  >
                    <span>{p.descricao}</span>

                    <span>{`   CÓD: ${p.id}`}</span>
                  </ListGroup.Item>
                ))
            }
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProdutosCaixa;
