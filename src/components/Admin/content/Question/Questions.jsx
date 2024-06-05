import { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { TbHeartPlus } from "react-icons/tb";

const Questions = (props) => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({});
  return (
    <div className="questions-container">
      <div className="title">Manage Questions</div>
      <div className="add-new-question">
        <div className="col-6">
          <label>Select Quiz</label>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
        </div>
        <div className="mt-3">Add Question:</div>
        <div className="questions-content">
          <div class="form-floating description">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Description</label>
          </div>
          <div className="group-upload">
            <label className="label-upload">Upload Image</label>
            <input type="file" hidden/>
            <span>MyImage.jpg</span>
          </div>
          <div className="btn-add">
            <span><TbHeartPlus className="icon-add"/></span>
          </div>

          <div className="answers">
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
