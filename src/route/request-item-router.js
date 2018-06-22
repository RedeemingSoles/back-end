'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import RequestItem from '../model/request-item';
import Client from '../model/client';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import logger from '../lib/logger';

const jsonParser = json();
const requestItemRouter = new Router();

requestItemRouter.post('/request-item', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.body.shoesRequestForm) {
    return next(new HttpError(400, 'REQUEST ITEM - invalid request'));
  }
  return Client.findOne({ account: request.account._id })
    .then((client) => {
      request.body.client = client._id;
    })
    .then(() => {
      return new RequestItem(request.body).save()
        .then((requestItem) => {
          logger.log(logger.INFO, 'POST - responding with a 200 status code.');
          return response.json(requestItem);
        });
    })
    .catch(next);
});

export default requestItemRouter;
