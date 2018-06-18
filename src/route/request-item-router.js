'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';

import RequestItem from '../model/request-item';
import logger from '../lib/logger';

const jsonParser = json();
const requestItemRouter = new Router();

requestItemRouter.post('/request-item', jsonParser, (request, response, next) => {
  if (!request.body.shoesRequestForm || !request.body.shoeType || !request.body.gender ||
      !request.body.age || !request.body.size) {
    return next(new HttpError(400, 'REQUEST ITEM - invalid request'));
  }
  return new RequestItem({
    ...request.body,
    shoesRequestForm: request.shoesRequestForm._id,
  //  TODO: test for client property & || request form properties
  })
      .save()
      .then((requestItem) => {
        logger.log(logger.INFO, 'Returning a 200 and a new Request Item');
        return response.json(requestItem);
      })
      .catch(next);
});

// TODO:  requestItemRouter.get('/profile/:id', (request, response, next) => {

export default requestItemRouter;
