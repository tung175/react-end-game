
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";

function ModalResult(props) {
  
  const {show, setShow, dataModalResult} = props


  const handleClose = () => {
    setShow(false)
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>Total Questions: {dataModalResult.countTotal}</div>
            <div>Total Correct answers:: {dataModalResult.countCorrect}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
