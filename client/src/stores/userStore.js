import { makeAutoObservable } from 'mobx';

class UserStore {
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user) {
    this.user = user;
  }
}

export default new UserStore();
