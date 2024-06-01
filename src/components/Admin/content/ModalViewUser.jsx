
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import _ from "lodash";

function ModalViewUser(props) {
  const { show, setShow, dataView, resetUpdateData } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("USER");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      setEmail(dataView.email);
      setUsername(dataView.username);
      setRole(dataView.role);
      setImage("");
      if (dataView.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
      }
    }
  }, [dataView]);

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setPreviewImage("");
    setImage("");
    resetUpdateData();
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
          <Modal.Title>View a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                disabled
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                disabled
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <label for="inputAddress">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                disabled
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                disabled
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
                disabled
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
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalViewUser;
