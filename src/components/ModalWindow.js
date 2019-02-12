import { Form, Button, Modal } from "react-bootstrap";
import React from 'react';

  export default (
    function ModalWindow(props){
        return(   
                <Modal show={props.show} className="modalError">
                  <Modal.Header closeButton onClick={props.onClickHeader}>
                    <Modal.Title>{props.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body >
                    <Form.Label >{props.msg}</Form.Label>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant={props.variant} onClick={props.onClickButton}>Ok</Button>
                  </Modal.Footer>
                </Modal>  )
      }
  )
