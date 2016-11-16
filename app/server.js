import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// initialize
const app = express();
const mongoURI = 'mongodb://localhost/cloudflare-exercise';
mongoose.connect(mongoURI);

// enable/disable cross origin resource sharing if necessary
app.use(cors());

// enable json message body for posting data to API
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// START THE SERVER
// =============================================================================
const port = 9090;
app.listen(port);

console.log(`listening on: ${port}`);
