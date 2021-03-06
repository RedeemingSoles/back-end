'use strict';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from './logger';
import errorMiddleware from './error-middleware';
import accountRouter from '../route/account-router';
import clientRouter from '../route/client-router';
import shoeRouter from '../route/shoes-router';
import shoesRequestFormRouter from '../route/shoes-request-form-router';
import requestItemRouter from '../route/request-item-router';

const app = express();
let server = null;

app.use(cors({ 
  origin: process.env.CORS_ORIGINS,
  credentials: true, 
}));
app.use(accountRouter);
app.use(clientRouter);
app.use(shoeRouter);
app.use(shoesRequestFormRouter);
app.use(requestItemRouter);

app.all('*', (request, response) => {
  logger.log(logger.INFO, 'Returning a 404 from the catch-all/default route');
  return response.sendStatus(404);
});

app.use(errorMiddleware);

const startServer = () => {
  return mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      server = app.listen(process.env.PORT, () => {
        logger.log(logger.INFO, `Server is listening on port ${process.env.PORT}`);
      });
    });
};

const stopServer = () => {
  return mongoose.disconnect()
    .then(() => {
      server.close(() => {
        logger.log(logger.INFO, 'Server is off');
      });
    });
};

export { startServer, stopServer };
