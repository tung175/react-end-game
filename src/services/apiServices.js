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
