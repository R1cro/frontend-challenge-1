import { makeAutoObservable } from 'mobx';

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  private auth = localStorage.getItem('mrf-auth'); // Dummy authentication

  setAuthenticated = (status: boolean) => {
    this.auth = status ? '1' : '0';
    status ? localStorage.setItem('mrf-auth', '1') : localStorage.removeItem('mrf-auth');
  };

  get isAuthenticated(): boolean {
    return this.auth === '1';
  }
}

const authStore = new AuthStore();
export const useAuthStore = () => authStore;
export default authStore;
