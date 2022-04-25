import agent from '../libs/agent';

export default class CoachService {
  static create(data) {
    return agent.post('/coaches', data);
  }

  static findAll(query = {}) {
    return agent.get('/coaches', { params: query });
  }

  static getCreation() {
    return agent.get('/coaches/get-creation');
  }

  static findOne(coachId) {
    return agent.get(`/coaches/${coachId}`);
  }

  static update(coachId, data) {
    return agent.patch(`/coaches/${coachId}`, data);
  }

  static delete(coachId) {
    return agent.delete(`/coaches/${coachId}`);
  }
}
