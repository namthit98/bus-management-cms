import agent from '../libs/agent';

export default class TicketService {
  static create(data) {
    return agent.post(`/tickets`, data);
  }

  static remove(ticketId) {
    return agent.delete(`/tickets/${ticketId}`);
  }

  static update(ticketId, data) {
    return agent.patch(`/tickets/${ticketId}`, data);
  }

  static toggleStatus(ticketId) {
    return agent.patch(`/tickets/${ticketId}/status`);
  }
}
