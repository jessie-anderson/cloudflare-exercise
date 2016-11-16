import Certificate from '../models/certificate_model';
import Customer from '../models/customer_model';

export const createCertificate = (request, response) => {
  const certificate = new Certificate();
  if (typeof request.body.key === undefined || typeof request.body.body === undefined) {
    response.json({ error: 'request body must contain fields \'key\' and \'body\'' });
  }
  certificate.customer = request.params.customerId;
  certificate.active = true;
  certificate.key = request.body.key;
  certificate.body = request.body.body;
  certificate.save()
  .then((savedCertificate) => {
    Customer.findById(request.params.customerId)
    .then(customer => {
      customer.certificates.push(savedCertificate._id);
      const updatedCustomer = Object.assign({}, customer._doc, { certificates: customer.certificates });
      Customer.update({ _id: customer._id }, updatedCustomer);
    })
    .catch(error => {});
  })
  .catch((error) => {});
};

export const deactivateCertificate = (request, response) => {
  const certificateId = request.params.certificateId;
  Certificate.findById(certificateId)
  .then(certificate => {
    const update = {
      active: false,
    };
    const updatedCertificate = Object.assign({}, certificate._doc, update);
    Certificate.update({ _id: certificateId }, updatedCertificate)
    .then(
      // external HTTP post!
    )
    .catch(error => {});
  })
  .catch(error => {});
};

export const activateCertificate = (request, response) => {
  const certificateId = request.params.certificateId;
  Certificate.findById(certificateId)
  .then((certificate) => {
    const update = {
      active: true,
    };
    const updatedCertificate = Object.assign({}, certificate._doc, update);
    Certificate.update({ _id: certificateId }, updatedCertificate)
    .then(
      // external HTTP post!
    )
    .catch(error => {});
  })
  .catch(error => {});
};
