import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import logger from './logger';

import { router } from './routes/index';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/', router);

const connStr = `mongodb+srv://musicianshelperdbuser:${process.env.mongodbpass}@cluster0.z3l1v.mongodb.net/musicianshelper?retryWrites=true&w=majority`;
mongoose.connect(connStr, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
}).then(() => {
  logger.info('Successfully connected to mongo server');
}).catch((e) => {
  logger.error('Error connecting to database', e);
});

app.use((err:any, req: any, res: any) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`listening on port ${port}`);
});
