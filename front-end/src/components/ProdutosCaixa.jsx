/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Form, ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { normalizeText } from '../../utils/normalize_text';

function ProdutosCaixa({ ...props }) {
  const [filter, setFilter] = useState([]);
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

  useEffect(() => {
    setFilter([...products
      .filter(({ nome, id }) => nome.includes(input) || id.toString().includes(input))]);
  }, [products, input]);

  return (
    <>
      <Button variant="primary" onClick={ () => addProduct('') }>
        TODOS OS PRODUTOS
      </Button>

      <Modal show={ show } onHide={ handleClose } animation={ false }>
        <Modal.Header>
          <Modal.Title>PRODUTOS</Modal.Title>
        </Modal.Header>
        <Form.Control
          id="search-product"
          type="text"
          placeholder="FILTRAR PRODUTOS"
          onChange={ handleChange }
          value={ input }
        />
        <Modal.Body>
          <ListGroup>
            {
              filter.map((p, i) => (
                <ListGroup.Item
                  className="search-list"
                  style={ { cursor: 'pointer' } }
                  key={ i + p.nome }
                  onClick={ () => {
                    addProduct(p.nome);
                    setInput('');
                    handleClose();
                  } }
                >
                  <span>{p.nome}</span>

                  <span>{`   CÓD: ${p.id}`}</span>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ handleClose }>
            Close
          </Button>
          <Button variant="primary" onClick={ handleClose }>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProdutosCaixa;
