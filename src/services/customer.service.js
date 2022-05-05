import agent from '../libs/agent';

export default class CustomerService {
  static create(data) {
    return agent.post('/customers', data);
  }

  static findAll(query = {}) {
    return agent.get('/customers', { params: query });
  }

  static findOne(customerId) {
    return agent.get(`/customers/${customerId}`);
  }

  static update(customerId, data) {
    return agent.patch(`/customers/${customerId}`, data);
  }

  static delete(customerId) {
    return agent.delete(`/customers/${customerId}`);
  }
}
