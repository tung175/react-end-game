import _ from "lodash";

const Question = (props) => {
  const { data, index, handleCheckboxPr } = props;
  console.log(222, data);
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleCheckbox = (event, aId, qId) => {
    console.log(333, aId, qId);
    handleCheckboxPr(aId, qId)
  }
  return (
    <>
      {data.image ? (
        <div className="q-image">
          <img alt="" src={`data:image/jpeg;base64,${data.image}`}></img>
        </div>
      ) : (
        <div className="q-image"></div>
      )}
      <div className="question">
        Question {index + 1}: {data.questionDescription}
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length > 0 &&
          data.answers.map((item, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={(event) => handleCheckbox(event, item.id, +data.questionId)}
                  />
                  <label className="form-check-label">{item.description}</label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Question;
