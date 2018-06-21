'use strict';

import { Router } from 'express';
import { json } from 'body-parser';

import Client from '../model/client';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import ShoesRequestForm from '../model/shoes-request-form';
import logger from '../lib/logger';

const jsonParser = json();

const shoesRequestFormRouter = new Router();

shoesRequestFormRouter.post('/request', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  return Client.findOne({ account: request.account._id })
    .then((client) => {
      request.body.client = client._id;
    })
    .then(() => {
      return new ShoesRequestForm(request.body).save()
        .then((requestForm) => {
          logger.log(logger.INFO, 'POST - responding with a 200 status code.');
          return response.json(requestForm);
        });
    })
    .catch(next);
});

export default shoesRequestFormRouter;
