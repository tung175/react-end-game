import _ from "lodash";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuizForAdmin } from "../../../../services/apiServices";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name);
      setDescription(dataUpdate.description);
      setType(dataUpdate.difficulty);
      setImage("");
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType("");
    setPreviewImage("");
    setImage("");
    setDataUpdate({});
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitUpdateQuiz = async () => {
    let data = await putUpdateQuizForAdmin(dataUpdate.id, name, description, type, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
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
          <Modal.Title>Update a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="form-group col-md-6">
              <label for="inputEmail4">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group col-md-6">
              <label for="inputPassword4">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="text"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="form-group col-md-4">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
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
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
