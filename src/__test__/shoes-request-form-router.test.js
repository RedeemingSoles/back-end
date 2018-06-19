'use strict';

import superagent from 'superagent';
import { createClientMock, removeClientMock } from './lib/client-mock';
import { startServer, stopServer } from '../lib/server';
import ShoesRequestForm from '../model/shoes-request-form';

const apiURL = `http://localhost:${process.env.PORT}`;

const removeRequestFormMock = () => {
  return Promise.all([
    ShoesRequestForm.remove({}),
  ]);
};

describe('shoes-request-form-router.test.js', () => {
  beforeAll(startServer);
  afterEach(removeClientMock);
  afterEach(removeRequestFormMock);
  afterAll(stopServer);
  jest.setTimeout(10000);
  describe('POST /request', () => {
    test('POST - should return a 200 and the newly added request form.', () => {
      let clientMock = {};
      return createClientMock()
        .then((clientSetMock) => {
          clientMock = clientSetMock;
          return clientMock;
        })
        .then(() => {
          const { token } = clientMock.accountSetMock;
          return superagent.post(`${apiURL}/request`)
            .set('Authorization', `Bearer ${token}`)
            .send({
              client: clientMock.client._id,
            })
            .then((response) => {
              console.log('__RESPONSE__', response);
              expect(response.status).toEqual(200);
              expect(response.body.requestItems).toEqual([]);
            });
        });
    });
    test('placeholder', () => {
      expect(true).toBeTruthy();
    });
  });
});
