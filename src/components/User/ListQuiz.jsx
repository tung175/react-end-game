import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss"
import { useNavigate } from "react-router-dom";
const ListQuiz = (props) => {
  const navigate = useNavigate()

  const [arrQuiz, setArrQuiz] = useState([]);

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    let data = await getQuizByUser();
    console.log(data);
    if (data && data.EC === 0) {
      setArrQuiz(data.DT);
    }
  };
  return (
    <>
      <div className="list-quiz-container">
        {arrQuiz &&
          arrQuiz?.length &&
          arrQuiz.map((item, index) => {
            return (
              <div key={`${index}-quiz`} className="card" style={{ width: "18rem" }}>
                <img className="card-img-top" src={`data:image/jpeg;base64,${item.image}`} alt="Card image cap" />
                <div className="card-body">
                  <h5 className="card-title">Quiz {index + 1}</h5>
                  <p className="card-text">
                    {item.description}
                  </p>
                  <button onClick={() => navigate(`/quiz/${item.id}`, {state: {quizTitle: item.description}})} className="btn btn-primary">
                    Start Now
                  </button>
                </div>
              </div>
            );
          })}
          {arrQuiz && arrQuiz?.length === 0 && arrQuiz.map(() => {
            return(
                <div>
                    You don't have any quiz now ...
                </div>
            )
          })}
      </div>
    </>
  );
};

export default ListQuiz;
