import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
const DetailQuiz = (props) => {
  const params = useParams();
  const location = useLocation();
  const quizId = params.id;

  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataModal, setDataModal] = useState({})

  useEffect(() => {
    fetchQuestions();
  }, [quizId]);

  const fetchQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res?.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        .groupBy("id")
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false
            answers.push(item.answers);
          });
          return { questionId: key, answers, questionDescription, image };
        })
        .value()
      setDataQuiz(data);
    }
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length >= index + 1) {
      setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (index - 1 < 0) return;

    setIndex(index - 1);
  };

  const handleFinish = async () => {
    let payload = {
      quizId: +quizId,
      answers: []
    }
    let answers = []
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach(item => {
        let questionId = item.questionId
        let userAnswerId = []

        item.answers.forEach(item => {
          if (item.isSelected === true) {
            userAnswerId.push(item.id)
          }
        })
        answers.push({
          questionId: +questionId,
          userAnswerId
        })
      })
      payload.answers = answers
      
      let res = await postSubmitQuiz(payload)
      if (res && res.EC === 0) {
        setDataModal({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData
        })
        setIsShowModalResult(true)
      } else {
        
      }
    }
  }

  const handleCheckbox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
        question.answers = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );
    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  return (
    <>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            Quiz {quizId}: {location?.state?.quizTitle}
          </div>
          <div className="q-body">
            <img alt="" />
          </div>
          <div className="q-content">
            <Question
              handleCheckboxPr={handleCheckbox}
              index={index}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
          <div className="footer">
            <button
              className="btn btn-secondary"
              onClick={() => handlePrevious()}
            >
              Previous
            </button>
            <button className="btn btn-primary" onClick={() => handleNext()}>
              Next
            </button>
            <button className="btn btn-warning" onClick={() => handleFinish()}>
              Finish
            </button>
          </div>
        </div>
        <div className="right-content">count down</div>
      </div>
      <ModalResult
      dataModalResult={dataModal}
      setShow={setIsShowModalResult}
      show={isShowModalResult}
      />
    </>
  );
};

export default DetailQuiz;
