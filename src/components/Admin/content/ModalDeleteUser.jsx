
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import { deleteAUser } from "../../../services/apiServices";
import { toast } from "react-toastify";

function ModalDeleteUser(props) {
  const { show, setShow, dataDelete, resetUpdateData, setCurrentPage, currentPage, fetchListUsersPaginate } = props;
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataDelete)) {
      setEmail(dataDelete.email);
    }
  }, [dataDelete]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    resetUpdateData();
  };
  
  const handleSubmitDeleteUser = async () => {
    let data = await deleteAUser(dataDelete.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      setCurrentPage(1)
      await fetchListUsersPaginate(1);
      // await props.fetchListUsers();
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  }

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
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure Delete Email: 
          <b>
            {dataDelete && dataDelete.email ? dataDelete.email : ""}
          </b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;
