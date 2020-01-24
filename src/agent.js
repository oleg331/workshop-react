import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import commonStore from "./core/stores/commonStore";
import authStore from "./core/stores/authStore";
import { APIUrl } from "./core";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = APIUrl;

const handleErrors = err => {
  if (err && err.response && err.response.status === 401) {
    authStore.logout();
  }
  return err;
};

const responseBody = res => res.body;

const tokenPlugin = req => {
  if (commonStore.token) {
    req.set("authorization", `${commonStore.token}`);
  }
};

const requests = {
  del: (url, body) =>
    superagent
      .del(`${API_ROOT}${url}`)
      .send(body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  get: url =>
    superagent
      .get(`${API_ROOT}${url}`)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  put: (url, body) =>
    superagent
      .put(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  post: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody),
  postWithoutToken: (url, body) =>
    superagent
      .post(`${API_ROOT}${url}`, body)
      .end(handleErrors)
      .then(responseBody),
  patch: (url, body) =>
    superagent
      .patch(`${API_ROOT}${url}`, body)
      .use(tokenPlugin)
      .end(handleErrors)
      .then(responseBody)
};

const auth = {
  login: userInfo =>
    requests.postWithoutToken("/auth/signin", {
      email: userInfo.email,
      password: userInfo.password
    }),
  register: userInfo => requests.postWithoutToken("/auth/signup", userInfo)
};

const boards = {
  getAll: () => requests.get("/boards"),
  get: boardId => requests.get(`/boards/${boardId}`),
  create: title => requests.post("/boards", { title }),
  update: (boardId, body) => requests.put(`/boards/${boardId}`, body),
  delete: boardId => requests.del(`/boards/${boardId}`)
};

const columns = {
  add: (id, body) => requests.post(`/columns/${id}`, body),
  delete: id => requests.del(`/columns/${id}`),
  update: (id, body) => requests.put(`/columns/${id}`, body)
};

const tasks = {
  add: (id, body) => requests.post(`/tasks/${id}`, body),
  delete: id => requests.del(`/tasks/${id}`),
  update: (id, body) => requests.put(`/tasks/${id}`, body)
};

const users = {
  getAll: () => requests.get(`/users`),
  toggleOnBoard: (boardId, body) => requests.patch(`/boards/${boardId}`, body),
  toggleOnTask: (taskId, body) => requests.patch(`/tasks/${taskId}`, body)
};

const comments = {
  create: (taskId, body) => requests.post(`/comments/${taskId}`, body),
  delete: (commentId, body) => requests.del(`/comments/${commentId}`, body)
};

export default {
  auth,
  boards,
  columns,
  tasks,
  users,
  comments
};
