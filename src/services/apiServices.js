import axios from "../utils/axiosCustomize";

export const postCreateNewUser = (email, password, username, image, role) => {
  const form = new FormData();
  form.append("email", email);
  form.append("password", password);
  form.append("username", username);
  form.append("userImage", image);
  form.append("role", role);

  return axios.post("api/v1/participant", form);
};

export const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};

export const putUpdateUser = (id, username, role, image) => {
  const form = new FormData();
  form.append("id", id);
  form.append("username", username);
  form.append("role", role);
  form.append("userImage", image);

  return axios.put("api/v1/participant", form);
};

export const deleteAUser = (id) => {
  return axios.delete("api/v1/participant", { data: { id } });
};

export const getAllUsersPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

export const postLogin = (email, password) => {
  return axios.post(`api/v1/login`, { email, password, delay: 300 });
};

export const logout = (email, refresh_token) => {
  return axios.post(`/api/v1/logout`, { email, refresh_token });
};

export const postRegister = (email, password, username) => {
  return axios.post(`api/v1/register`, { email, password, username });
};

export const getQuizByUser = () => {
  return axios.get(`api/v1/quiz-by-participant`);
};

export const getDataQuiz = (quizId) => {
  return axios.get(
    `http://localhost:8081/api/v1/questions-by-quiz?quizId=${quizId}`
  );
};

export const postSubmitQuiz = (data) => {
  return axios.post(`/api/v1/quiz-submit`, { ...data });
};

export const postCreateNewQuiz = (description, name, difficulty, image) => {
  const form = new FormData();
  form.append("description", description);
  form.append("name", name);
  form.append("difficulty", difficulty);
  form.append("quizImage", image);

  return axios.post("api/v1/quiz", form);
};

export const getAllQuizForAdmin = () => {
  return axios.get(`api/v1/quiz/all`);
};

export const deleteQuizForAdmin = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};

export const putUpdateQuizForAdmin = (
  id,
  name,
  description,
  difficulty,
  image
) => {
  const form = new FormData();
  form.append("id", id);
  form.append("name", name);
  form.append("description", description);
  form.append("difficulty", difficulty);
  form.append("userImage", image);

  return axios.put("api/v1/quiz", form);
};

export const postCreateNewQuestionForQuiz = (quiz_id, description, image) => {
  const form = new FormData();
  form.append("quiz_id", quiz_id);
  form.append("description", description);
  form.append("userImage", image);

  return axios.post("api/v1/question", form);
};

export const postCreateNewAnswerQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post(`/api/v1/answer`, {
    description,
    correct_answer,
    question_id,
  });
};

export const postAssignQuiz = (quizId, userId) => {
  return axios.post(`/api/v1/quiz-assign-to-user`, { quizId, userId });
};

export const getQuizWithQA = (quizId) => {
  return axios.get(`/api/v1/quiz-with-qa/${quizId}`);
};

export const postUpsertQA = (data) => {
  return axios.post(`/api/v1/quiz-upsert-qa`, { ...data });
};
