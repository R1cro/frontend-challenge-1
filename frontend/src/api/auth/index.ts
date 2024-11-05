import { API } from '~/api';

export class AuthApi {
  static async signIn(username: string, password: string) {
    await API.post('/auth/sign-in', { username, password });
  }

  static async signOut() {
    await API.post('/auth/sign-out');
  }
}
