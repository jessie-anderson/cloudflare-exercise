import mongoose, { Schema } from 'mongoose';

const CertificateSchema = new Schema({
  customer: {
    type: Schema.types.ObjectId,
    ref: 'Customer',
    default: null,
  },
  active: {
    type: Boolean,
    default: true,
  },
  key: {
    type: String,
    default: '',
  },
  body: {
    type: String,
    default: '',
  },
});

const CertificateModel = mongoose.model('Certificate', CertificateSchema);

export default CertificateModel;
