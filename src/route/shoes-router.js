'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import Shoes from '../model/shoes';
import logger from '../lib/logger';

const jsonParser = json();

const shoesRouter = new Router();

shoesRouter.post('/shoes', jsonParser, (request, response, next) => {
  if (!request.body.shoeType || !request.body.age || !request.body.gender ||
      !request.body.shoeSize) {
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

shoesRouter.get('/shoes', jsonParser, (request, response, next) => {
  if (!request.query.shoeType || !request.query.age || !request.query.gender ||
    !request.query.shoeSize) {
    return next(new HttpError(400, 'SHOES - invalid request'));
  }

  return Shoes.findOne(request.query)
    .then((shoes) => {
      logger.log(logger.INFO, 'GET - responding with a 200 status code and a matched pair of shoes');
      return response.json(shoes);
    })
    .catch(next);
});

export default shoesRouter;
