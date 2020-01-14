import Axios from "axios";

import { APIUrl } from "../constants";

export class apiService {
  constructor() {
    const token = localStorage.getItem("token") || "";
    this.options = {
      headers: new Headers({
        authorization: token
      })
    };
  }

  setToken(token) {
    this.options.headers.set("authorization", token);
    localStorage.setItem("token", token);
  }

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUserInfo() {
    const user = localStorage.getItem("user");
    return JSON.parse(user);
  }

  resetToken() {
    this.options.headers.delete("authorization");
    localStorage.removeItem("token");
  }

  postWithoutToken(path, body) {
    return Axios.post(`${APIUrl}/${path}`, body).then(response => {
      if (response.success && response.data.token) {
        this.setToken(response.data.token);
        this.setUser(response.data.user);
      }
      return response.data;
    });
  }

  post(path, body) {
    return Axios.post(`${APIUrl}/${path}`, body, this.options).then(
      response => response.data
    );
  }

  get(path) {
    return Axios.get(`${APIUrl}/${path}`, this.options).then(
      response => response.data
    );
  }

  delete(path, body) {
    const options = {
      ...this.options,
      body
    };
    return Axios.delete(`${APIUrl}/${path}`, options).then(
      response => response.data
    );
  }

  put(path, body) {
    return Axios.put(`${APIUrl}/${path}`, body, this.options).then(
      response => response.data
    );
  }

  patch(path, body) {
    return Axios.patch(`${APIUrl}/${path}`, body, this.options).then(
      response => response.data
    );
  }
}
