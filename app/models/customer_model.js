import mongoose, { Schema } from 'mongoose';

const CustomerSchema = new Schema({
  name: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
  },
  certificates: [{
    type: Schema.Types.ObjectId,
    ref: 'Certificate',
    default: null,
  }],
});

const CustomerModel = mongoose.model('Customer', CustomerSchema);

export default CustomerModel;
