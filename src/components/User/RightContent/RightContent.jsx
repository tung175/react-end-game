import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = (props) => {
  const { dataQuiz, handleFinish, setIndex } = props;
  const refDiv = useRef([]);

  const onTimeUp = () => {
    handleFinish();
  };

  const getClassQuestion = (index, question) => {
    if (question && question.answers.length > 0) {
      let check = question.answers.find((a) => a.isSelected === true);
      if (check) {
        return "question selected";
      }
    }
    return "question";
  };

  const handleClickQuestion = (index, item) => {
    setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = "question";
        }
      });
    }

    if (item && item.answers.length > 0) {
      let check = item.answers.find((a) => a.isSelected === true);
      if (check) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };
  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={`question-child-${index}`}
                className={getClassQuestion(index, item)}
                onClick={() => handleClickQuestion(index, item)}
                ref={element => refDiv.current[index] = element}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
