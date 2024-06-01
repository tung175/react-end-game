import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiServices";

function ModalCreateUser(props) {
  const { show, setShow, setCurrentPage, currentPage, fetchListUsersPaginate } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setPreviewImage("");
    setImage("");
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("invalid Email");
      return;
    }
    if (!password) {
      toast.error("invalid Password");
      return;
    }

    let data = await postCreateNewUser(email, password, username, role, image);
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
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <label for="inputAddress">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
                value={role}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalCreateUser;
