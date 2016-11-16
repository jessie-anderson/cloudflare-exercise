import Certificate from '../models/certificate_model';
import Customer from '../models/customer_model';
import keypair from 'keypair';
import { XMLHttpRequest } from 'xmlhttprequest';
import config from '../config';

export const createCertificate = (request, response) => {
  const certificate = new Certificate();
  if (typeof request.body.body === 'undefined') {
    response.json({ error: 'request body must contain field \'body\'' });
    return;
  }
  certificate.customer = request.params.customerId;
  certificate.active = true;
  const keys = keypair();
  certificate.key = keys.private;
  certificate.body = request.body.body;
  certificate.save()
  .then((savedCertificate) => {
    Customer.findById(request.params.customerId)
    .then(customer => {
      customer.certificates.push(savedCertificate._id);
      const updatedCustomer = Object.assign({}, customer._doc, { certificates: customer.certificates });
      Customer.update({ _id: customer._id }, updatedCustomer)
      .then(result => {
        response.json({ message: 'success creating certificate' });
      })
      .catch(error => {
        response.json({ error });
      });
    })
    .catch(error => {
      response.json({ error });
    });
  })
  .catch((error) => {
    response.json({ error });
  });
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
    .then(success => {
      const externalPost = new XMLHttpRequest();
      externalPost.onload = () => {
        console.log(externalPost);
      };
      const url = config.externalServer;
      externalPost.open('POST', url, true);
      externalPost.send(`certificate with id ${certificateId} deactivated`);
      response.json({ message: 'successfully deactivated certificate' });
    })
    .catch(error => {
      response.json({ error });
    });
  })
  .catch(error => {
    response.json({ error });
  });
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
    .then(success => {
      const externalPost = new XMLHttpRequest();
      externalPost.onload = () => {
        console.log(externalPost);
      };
      const url = config.externalServer;
      externalPost.open('POST', url, true);
      externalPost.send(`certificate with id ${certificateId} activated`);
      response.json({ message: 'successfully activated certificate' });
    })
    .catch(error => {
      response.json({ error });
    });
  })
  .catch(error => {
    response.json({ error });
  });
};
