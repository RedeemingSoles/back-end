'use strict';

import superagent from 'superagent';
import removeRequestItemMock from './lib/request-item-mock';
import { startServer, stopServer } from '../lib/server';
import { createClientMock } from './lib/client-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('request-item-router.test.js', () => {
  beforeAll(startServer);
  afterAll(removeRequestItemMock);
  afterAll(stopServer);
  jest.setTimeout(10000);

  describe('POST /request-item', () => {
    test('POST - should return a 200 status code and a request item.', () => {
      let clientMock = {};
      return createClientMock()
        .then((clientSetMock) => {
          clientMock = clientSetMock;
          return clientMock;
        })
        .then(() => {
          clientMock.token = clientMock.accountSetMock.token;
          return superagent.post(`${apiURL}/request`)
            .set('Authorization', `Bearer ${clientMock.token}`)
            .send({
              client: clientMock.client._id,
            })
            .then((shoesRequestFormSetMock) => {
              clientMock.shoesRequestForm = shoesRequestFormSetMock;
              return superagent.post(`${apiURL}/request-item`)
                .set('Authorization', `Bearer ${clientMock.token}`)
                .send({
                  childName: 'testChildName',
                  shoeType: 'basketball',
                  age: 'youth',
                  gender: 'female',
                  shoeSize: 5,
                  message: 'Inspirational message from coach.',
                  shoesRequestForm: clientMock.shoesRequestForm.body._id,
                })
                .then((response) => {
                  console.log('__RESPONSE__', response);
                  expect(response.status).toEqual(200);
                });
            });
        });
    });
  });
});
