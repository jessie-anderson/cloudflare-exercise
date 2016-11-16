import { Router } from 'express';

import * as Certificate from './controllers/certificate_controller';
import * as Customer from './controllers/customer_controller';

const router = Router();

router.route('/certificates/new/:customerId')
      .post(Certificate.createCertificate);

router.route('/certificates/deactivate/:certificateId')
      .put(Certificate.deactivateCertificate);

router.route('/certificates/activate/:certificateId')
      .put(Certificate.activateCertificate);

router.route('/customers/new')
      .post(Customer.createCustomer);

router.route('/customers/delete/:customerId')
      .delete(Customer.deleteCustomer);

router.route('/customers/activeCertificates/:customerId')
      .get(Customer.listAllActiveCertificates);

export default router;
