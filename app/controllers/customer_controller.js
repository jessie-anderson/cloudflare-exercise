import Customer from '../models/customer_model';

export const createCustomer = (request, response) => {
  if (typeof request.body.name === undefined || typeof request.body.email === undefined) {
    response.json({ error: 'request body must contain fields \'name\' and \'email\'' });
  }
  const customer = new Customer();
  customer.name = request.body.name;
  customer.email = request.body.email;
  customer.certificates = [];
  customer.save();
};

export const deleteCustomer = (request, response) => {
  const customerId = request.params.customerId;
};
