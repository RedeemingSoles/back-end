'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import ShoesRequestForm from '../model/shoes-request-form';
import logger from '../lib/logger';

const jsonParser = json();

const shoesRequestFormRouter = new Router();

shoesRequestFormRouter.post('/shoes-request-form', jsonParser, (request, response, next) => {
  if (!request.client) {
    return next(new HttpError(400, 'SHOES REQUEST FORM - invalid request'));
  }
  return new ShoesRequestForm({
    ...request.body,
  })
      .save()
      .then((shoesRequestForm) => {
        logger.log(logger.INFO, 'Returning a 200 and a new Shoes Request Form');
        return response.json(shoesRequestForm);
      })
      .catch(next);
});

// TODO: shoesRequestFormRouter.get('/shoes-request-forms', jsonParser, (request, response, next)

export default shoesRequestFormRouter;
