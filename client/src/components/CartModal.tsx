import React, {FC} from 'react';
import {Button, Modal} from 'react-bootstrap';

export type TypeModalProps = {
  show: boolean,
  onHide: () => void
  // products: any
}

const CartModal: FC<TypeModalProps> = ({show, onHide}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Корзина
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success">Оформить заказ</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;