'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createAccountMock } from './lib/account-mock';
import { removeClientMock, createClientMock } from './lib/client-mock';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('CLIENT SCHEMA', () => {
  beforeAll(startServer);
  afterEach(removeClientMock);
  afterAll(stopServer);
  jest.setTimeout(10000);

  describe('POST /profile', () => {
    test('POST - should return a 200 status code and the newly created client-profile.', () => {
      let accountMock = null;
      return createAccountMock()
        .then((accountSetMock) => {
          accountMock = accountSetMock;
          return superagent.post(`${apiURL}/profile`)
            .set('Authorization', `Bearer ${accountMock.token}`)
            .send({
              organizationName: 'Home Movies',
              contactFirstName: 'John',
              contactLastName: 'McGuirk',
              title: 'Coach',
              phoneNumber: '(123) 456-7891',
              mailingAddress: '123 Denny Way',
              city: 'Seattle',
              state: 'WA',
              zipCode: '98133',
              account: accountSetMock.account._id,
            });
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.account).toEqual(accountMock.account._id.toString());
          expect(response.body.organizationName).toEqual('Home Movies');
          expect(response.body.contactFirstName).toEqual('John');
          expect(response.body.contactLastName).toEqual('McGuirk');
          expect(response.body.title).toEqual('Coach');
          expect(response.body.phoneNumber).toEqual('(123) 456-7891');
          expect(response.body.mailingAddress).toEqual('123 Denny Way');
          expect(response.body.city).toEqual('Seattle');
          expect(response.body.state).toEqual('WA');
          expect(response.body.zipCode).toEqual('98133');
        });
    });
    test('POST - should return a 400 status code for missing required values.', () => {
      return createAccountMock()
        .then((accountSetMock) => {
          return superagent.post(`${apiURL}/profile`)
            .set('Authorization', `Bearer ${accountSetMock.token}`)
            .send({
              contactFirstName: 'Brendan',
            });
        })
        .then(Promise.reject)
        .catch((error) => {
          expect(error.status).toEqual(400);
        });
    });
  });

  describe('GET ROUTES', () => {
    describe('GET /profile', () => { 
      test('GET - should return a 200 status code and the newly created client-profile.', () => {
        let clientMock = null;
        return createClientMock()
          .then((clientSetMock) => {
            clientMock = clientSetMock;
            return superagent.get(`${apiURL}/profile/${clientMock.client._id}`)
              .set('Authorization', `Bearer ${clientMock.accountSetMock.token}`)
              .then((response) => {
                expect(response.status).toEqual(200);
              });
          });
      });
      test('GET - should return a 400 for no token being passed.', () => {
        let clientMock = null;
        return createClientMock()
          .then((clientSetMock) => {
            clientMock = clientSetMock;
            return superagent.get(`${apiURL}/profile/${clientMock.client._id}`)
              .then(Promise.reject)
              .catch((error) => {
                expect(error.status).toEqual(400);
              });
          });
      });
      test('GET - should return a 401 for an invalid token.', () => {
        let clientMock = null;
        return createClientMock()
          .then((clientSetMock) => {
            clientMock = clientSetMock;
            return superagent.get(`${apiURL}/profile/${clientMock.client._id}`)
              .set('Authorization', 'Bearer invalidToken')
              .then(Promise.reject)
              .catch((error) => {
                expect(error.status).toEqual(401);
              });
          });
      });
      test('GET - should return a 404 for an invalid id', () => {
        let clientMock = null;
        return createClientMock()
          .then((clientSetMock) => {
            clientMock = clientSetMock;
            return superagent.get(`${apiURL}/profile/badID`)
              .set('Authorization', `Bearer ${clientMock.accountSetMock.token}`)
              .then(Promise.reject)
              .catch((error) => {
                expect(error.status).toEqual(404);
              });
          });
      });
    });
  });
});
