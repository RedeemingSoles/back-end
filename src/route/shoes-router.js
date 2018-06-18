'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import Shoes from '../model/shoes';
import logger from '../lib/logger';

const jsonParser = json();

const shoesRouter = new Router();

shoesRouter.post('/shoes', jsonParser, (request, response, next) => {
  if (!request.shoeType || !request.body.age || !request.body.gender ||
      !request.body.size) {
    return next(new HttpError(400, 'SHOES - invalid request'));
  }
  return new Shoes({
    ...request.body,
  })
    .save()
    .then((shoes) => {
      logger.log(logger.INFO, 'Returning a 200 and a new Shoes');
      return response.json(shoes);
    })
    .catch(next);
});

// TODO: shoesRequestFormRouter.get('/shoes', jsonParser, (request, response, next) => {

export default shoesRouter;
