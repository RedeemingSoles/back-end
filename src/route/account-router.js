'use strict';

import bodyParser from 'body-parser';
import HttpError from 'http-errors';
import { Router } from 'express';

import Account from '../model/account';
import basicAuthMiddleware from '../lib/basic-auth-middleware';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import logger from '../lib/logger';

const jsonParser = bodyParser.json();
const accountRouter = new Router();

accountRouter.post('/signup', jsonParser, (request, response, next) => {
  if (!request.body.username || !request.body.email || !request.body.password) {
    logger.log(logger.INFO, 'Invalid request');
    throw new HttpError(400, 'Invalid request.');
  }
  return Account.create(request.body.username, request.body.email, request.body.password)
    .then((account) => {
      delete request.body.password;
      logger.log('logger.INFO', 'AUTH - creating TOKEN');
      return account.createToken();
    })
    .then((token) => {
      logger.log('logger.INFO', 'AUTH - returning a 200 code and a token');
      response.cookie('RS-Token', token, { maxAge: process.env.COOKIE_TIMEOUT });
      response.send(token);
    })
    .catch(next);
});

accountRouter.get('/login', basicAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }
  return request.account.createToken()
    .then((token) => {
      logger.log(logger.INFO, 'LOGIN - responding with a 200 status and a token');
      response.cookie('RS-Token', token, { maxAge: process.env.COOKIE_TIMEOUT });
      response.send({ token, isAdmin: request.account.isAdmin });
    })
    .catch(next);
});

accountRouter.get('/admin-validate', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(401, 'AUTH - not allowed'));
  }
  const { isAdmin } = request.account;
  logger.log(logger.INFO, 'VALIDATE - responding with a 200 status and verifies if account is admin.');
  return isAdmin ? response.send(200) : response.send(401);
});

export default accountRouter;
