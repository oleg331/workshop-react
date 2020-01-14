import superagentPromise from "superagent-promise";
import _superagent from "superagent";
import commonStore from "./core/stores/commonStore";
import authStore from "./core/stores/authStore";
import { APIUrl } from "./core";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = APIUrl;

const encode = encodeURIComponent;

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
  current: () => requests.get("/user"),
  login: userInfo =>
    requests.postWithoutToken("/auth/signin", { body: userInfo }),
  register: userInfo =>
    requests.postWithoutToken("/auth/signup", { body: userInfo }),
  save: user => requests.put("/user", { user })
};

const boards = {
  getAll: () => requests.get("/boards")
};

const tags = {
  getAll: () => requests.get("/tags")
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined });

const articles = {
  all: (page, lim = 10) => requests.get(`/articles?${limit(lim, page)}`),
  byAuthor: (author, page, query) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byTag: (tag, page, lim = 10) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(lim, page)}`),
  del: slug => requests.del(`/articles/${slug}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get("/articles/feed?limit=10&offset=0"),
  get: slug => requests.get(`/articles/${slug}`),
  unfavorite: slug => requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article => requests.post("/articles", { article })
};

const comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug => requests.get(`/articles/${slug}/comments`)
};

const profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`)
};

export default {
  articles,
  auth,
  boards,
  comments,
  profile,
  tags
};
