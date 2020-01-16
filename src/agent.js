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
  del: url =>
    superagent
      .del(`${API_ROOT}${url}`)
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
      .then(responseBody)
};

const auth = {
  login: userInfo =>
    requests.postWithoutToken("/auth/signin", {
      email: userInfo.email,
      password: userInfo.password
    }),
  register: userInfo =>
    requests.postWithoutToken("/auth/signup", userInfo)
};

const boards = {
  getAll: () => requests.get("/boards")
};

const comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`)
};

export default {
  auth,
  boards,
  comments,
};
