import { isEmpty } from 'lodash';
import queryString from 'query-string';
import agent from '../libs/agent';

export default class LineService {
  static create(data) {
    return agent.post('/lines', data);
  }

  static findAll(query = {}) {
    return agent.get(
      `/lines${isEmpty(query) ? '' : `?${queryString.stringify(query)}`}`
    );
  }

  static getCreation() {
    return agent.get('/lines/get-creation');
  }

  static findOne(lineId) {
    return agent.get(`/lines/${lineId}`);
  }

  static update(lineId, data) {
    return agent.patch(`/lines/${lineId}`, data);
  }

  static delete(lineId) {
    return agent.delete(`/lines/${lineId}`);
  }

  static createTicket(lineId, data) {
    return agent.post(`/lines/${lineId}/tickets`, data);
  }

  static removeTicket(lineId, ticketId) {
    return agent.delete(`/lines/${lineId}/tickets/${ticketId}`);
  }
}
