# Cloudflare Technical Exercise

## Setup
Requires Mongo and Mode to be installed
* Clone repository
* `cd` into repo and run `npm install`
* In `.env` file, indicate what URL you want the server to post to when it activates or deactivates a certificate (currently set to `http://localhost:8080`)
* In another shell, run `mongod` (starts mongo)
* In original shell, run `npm start`
* To see database, open another shell and run `mongo`
* Run `use cloudflare-exercise`
* To see all documents in a particular group (relevant groups are `customers` and `certificates`), run `db.<collection_name>.find()`

## API
### Customers
* Create customer: `POST` to `http://localhost:9090/api/customers/new`. Body of post must include fields `name` and `email`.
* Delete customer: `DELETE` to `http://localhost:9090/api/{customerId}` where `customerId` is the document of the ID representing the customer in the Mongo database.
* List customer's active certificates: `GET` to `http://localhost:9090/api/customers/activeCertificates/{customerId}` and the certificate IDs will come back in the json response
### Certificates
* Create certificate: `POST` to `http://localhost:9090/api/certificates/new/{customerId}` where `{customerId}` is the name of the certificate's owner. Body of post must include the field `body`
* Activate certificate: `PUT` to `http://localhost:9090/api/certificates/activate/{certificateId}`
* Deactivate certificate: `PUT` to `http://localhost:9090/api/certificates/deactivate/{certificateId}`
