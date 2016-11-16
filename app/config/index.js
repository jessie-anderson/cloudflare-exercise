import dotenv from 'dotenv';

dotenv.config();

export default {
  externalServer: process.env.EXTERNAL_SERVER,
};
