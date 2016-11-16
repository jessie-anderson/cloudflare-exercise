import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

// initialize
const app = express();
const mongoURI = 'mongodb://localhost/cloudflare-exercise';
mongoose.connect(mongoURI);
mongoose.Promise = global.Promise;

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable json parsing for posts
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// server startup
const port = 9090;
app.listen(port);

console.log(`listening on: ${port}`);
