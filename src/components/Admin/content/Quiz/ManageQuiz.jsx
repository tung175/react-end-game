import Select from "react-select";
import "./ManageQuiz.scss";
import { useState } from "react";
import { postCreateNewQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");

  const handleChangeFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
        setImage(event.target.files[0]);
      }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
        toast.error("Name or Description is required")
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image)
    if (res && res.EC === 0) {
        toast.success(res.EM)
        setName("")
        setDescription("")
        setImage(null)
    } else {
        toast.error(res.EM)
    }
  }

  return (
    <div className="quiz-container">
      <div className="title">manage q</div>
      <div className="add-new">
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new quiz:</legend>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Your quiz name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label for="floatingInput">Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label for="floatingPassword">Description</label>
          </div>
          <div className="my-3">
            <Select placeholder="Quiz type ..." value={type} onChange={setType} defaultValue={type}/>
          </div>
          <div className="more-actions form-group">
            <label>Upload Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => handleChangeFile(event)}
            />
          </div>
          <div className="mt-3">
            <button className="btn btn-warning" onClick={() => handleSubmitQuiz()}>Save</button>
          </div>
        </fieldset>
      </div>
      <div className="list-detail"></div>
    </div>
  );
};

export default ManageQuiz;
