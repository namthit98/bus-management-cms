import agent from '../libs/agent';

export default class AuthService {
  static login(data) {
    return agent.post('/auth/login', data);
  }

  static me() {
    return agent.get('/auth/me');
  }
}
