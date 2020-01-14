import { apiService } from "./api-service";
import { observable, action } from "mobx";

export class authService extends apiService {
  @observable currentUser = 0;
  @observable token = 0;

  constructor(props) {
    super(props);
    const token = localStorage.getItem("token");
    this.token = token;
  }

  @action isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  @action async auth(path, userInfo) {
    const user = await this.postWithoutToken(`auth/${path}`, {
      body: userInfo
    });
    this.currentUser = user;
    this.token = user.token;
    if (this.isAuthenticated()) {
      // TODO: navigate to dashboard this.router.navigate(['dashboard']);
    }
    return user;
  }

  @action logout() {
    localStorage.removeItem("token");
    // TODO this.router.navigate(['auth']);
    this.currentUser = null;
  }
}
