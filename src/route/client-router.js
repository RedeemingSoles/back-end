'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import Client from '../model/client';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import logger from '../lib/logger';

const jsonParser = json();
const clientRouter = new Router();

clientRouter.post('/profile', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.account || !request.body.organizationName || !request.body.contactFirstName ||
      !request.body.contactLastName || !request.body.title || !request.body.phoneNumber ||
      !request.body.mailingAddress || !request.body.city || !request.body.state ||
      !request.body.zipCode) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }
  return new Client({
    ...request.body,
    account: request.account._id,
  })
    .save()
    .then((client) => {
      logger.log(logger.INFO, 'Returning a 200 and a new Client');
      return response.json(client);
    })
    .catch(next);
});

clientRouter.get('/profile/me', bearerAuthMiddleware, (request, response, next) => {
  return Client.findOne({ account: request.account._id })
    .then((client) => {
      if (!client) {
        return next(new HttpError(404, 'Client not found'));
      }
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(client);
    })
    .catch(next);
});

clientRouter.get('/profile/:id', bearerAuthMiddleware, (request, response, next) => {
  return Client.findById(request.params.id)
    .then((client) => {
      logger.log(logger.INFO, 'GET - responding with a 200 status code');
      return response.json(client);
    })
    .catch(next);
});

clientRouter.put('/profile/:id', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  const options = { runValidators: true, new: true };
  return Client.findByIdAndUpdate(request.params.id, request.body, options)
    .then((updatedclient) => {
      logger.log(logger.INFO, 'PUT - responding with a 200 status code');
      return response.json(updatedclient);
    })
    .catch(next);
});

export default clientRouter;
