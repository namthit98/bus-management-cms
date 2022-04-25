import agent from '../libs/agent';

export default class RouteService {
  static create(data) {
    return agent.post('/routes', data);
  }

  static findAll(query = {}) {
    return agent.get('/routes', { params: query });
  }

  static getAllStartingPointAndDestinations() {
    return agent.get('/routes/starting-point-and-destinations');
  }

  static findOne(routeId) {
    return agent.get(`/routes/${routeId}`);
  }

  static update(routeId, data) {
    return agent.patch(`/routes/${routeId}`, data);
  }

  static delete(routeId) {
    return agent.delete(`/routes/${routeId}`);
  }
}
