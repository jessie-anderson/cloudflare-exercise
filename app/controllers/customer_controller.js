import Customer from '../models/customer_model';

export const createCustomer = (request, response) => {
  if (typeof request.body.name === 'undefined' || typeof request.body.email === 'undefined') {
    response.json({ error: 'request body must contain fields \'name\' and \'email\'' });
    return;
  }
  const customer = new Customer();
  customer.name = request.body.name;
  customer.email = request.body.email;
  customer.save()
  .then(result => {
    response.json({ message: 'successfully created customer' });
  })
  .catch(error => {
    response.json({ error });
  });
};

export const deleteCustomer = (request, response) => {
  const customerId = request.params.customerId;
  Customer.findById(customerId)
  .then(customer => {
    Customer.findById(customer._id).remove()
    .then(result => {
      response.json({ result });
    })
    .catch(error => {
      response.json({ error });
    });
  })
  .catch(error => {
    response.json({ error });
  });
};

export const listAllActiveCertificates = (request, response) => {
  const customerId = request.params.customerId;
  Customer.findById(customerId)
  .populate('certificates')
  .then(customer => {
    const activeCertificates = [];
    customer.certificates.forEach(certificate => {
      if (certificate.active === true) {
        activeCertificates.push(certificate._id);
      }
    });
    response.json({ activeCertificates });
  })
  .catch(error => {
    response.json({ error });
  });
};
