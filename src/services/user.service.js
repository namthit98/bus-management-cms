import agent from '../libs/agent';

export default class UserService {
  static create(data) {
    return agent.post('/users', data);
  }

  static findAll(query = {}) {
    return agent.get('/users', { params: query });
  }

  static findOne(userId) {
    return agent.get(`/users/${userId}`);
  }

  static update(userId, data) {
    return agent.patch(`/users/${userId}`, data);
  }

  static delete(userId) {
    return agent.delete(`/users/${userId}`);
  }

  static changePassword(data) {
    return agent.patch(`/users/password/change`, data);
  }
}
