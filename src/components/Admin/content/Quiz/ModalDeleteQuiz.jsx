import _ from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteQuizForAdmin } from "../../../../services/apiServices";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDeleteQuiz = (props) => {
  const { show, setShow, dataDelete } = props;

  useEffect(() => {
    if (!_.isEmpty(dataDelete)) {
    }
  }, [dataDelete]);

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmitDeleteQuiz = async () => {
    let data = await deleteQuizForAdmin(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();

      // await props.fetchListUsers();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  console.log(dataDelete);
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
          <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure Delete this quiz:
          <b>{dataDelete && dataDelete.id ? dataDelete.id : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteQuiz;
