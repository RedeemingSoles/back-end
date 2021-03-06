'use strict';

import superagent from 'superagent';
import removeShoesMock from './lib/shoes-mock';
import { startServer, stopServer } from '../lib/server';

const apiURL = `http://localhost:${process.env.PORT}`;

describe('shoes-router.test.js', () => {
  beforeAll(startServer);
  afterEach(removeShoesMock);
  afterAll(stopServer);
  jest.setTimeout(10000);

  describe('POST /shoes', () => {
    test('POST - should return a 200 status code and a new Shoes.', () => {
      return superagent.post(`${apiURL}/shoes`)
        .send({
          shoeType: 'basketball',
          age: 'youth',
          gender: 'female',
          shoeSize: 7,
          donor: 'testShoeDistributor',
        })
        .then((response) => {
          expect(response.status).toEqual(200);
          expect(response.body.shoeType).toEqual('basketball');
          expect(response.body.age).toEqual('youth');
          expect(response.body.gender).toEqual('female');
          expect(response.body.shoeSize).toEqual(7);
          expect(response.body.donor).toEqual('testShoeDistributor');
        });
    });
    test('POST - should return a 400 status code for missing required fields.', () => {
      return superagent.post(`${apiURL}/shoes`)
        .send({
          age: 'youth',
          gender: 'female',
          shoeSize: 8,
          donor: 'testShoeDistributor',
        })
        .then(Promise.reject)
        .catch((error) => {
          expect(error.status).toEqual(400);
        });
    });
  });

  describe('GET /shoes', () => {
    test('GET - should return a 200 status code and a matched pair of shoes.', () => {
      return superagent.post(`${apiURL}/shoes`)
        .send({
          shoeType: 'running-shoes',
          age: 'youth',
          gender: 'male',
          shoeSize: 8,
          donor: 'testShoeDistributor',
        })
        .then(() => {
          return superagent.post(`${apiURL}/shoes`)
            .send({
              shoeType: 'running-shoes',
              age: 'youth',
              gender: 'male',
              shoeSize: 11,
              donor: 'testRunningShoeDistributor',
            })
            .then((postedRunningShoes) => {
              return superagent.get(`${apiURL}/shoes/?shoeType=${postedRunningShoes.body.shoeType}&age=${postedRunningShoes.body.age}&gender=${postedRunningShoes.body.gender}&shoeSize=${postedRunningShoes.body.shoeSize}`)
                .then((response) => {
                  expect(response.status).toEqual(200);
                  expect(response.body.shoeType).toEqual('running-shoes');
                  expect(response.body.age).toEqual('youth');
                  expect(response.body.gender).toEqual('male');
                  expect(response.body.shoeSize).toEqual(11);
                  expect(response.body.donor).toEqual('testRunningShoeDistributor');
                });
            });
        });
    });
    test('GET - should return a 400 status code for missing required fields.', () => {
      return superagent.post(`${apiURL}/shoes`)
        .send({
          shoeType: 'boots',
          age: 'adult',
          gender: 'male',
          shoeSize: 8,
          donor: 'testShoeDistributor',
        })
        .then(() => {
          return superagent.post(`${apiURL}/shoes`)
            .send({
              shoeType: 'boots',
              age: 'youth',
              gender: 'female',
              shoeSize: 11,
              donor: 'testRunningShoeDistributor',
            })
            .then((postedRunningShoes) => {
              return superagent.get(`${apiURL}/shoes/?shoeType=${postedRunningShoes.body.shoeType}&age=${postedRunningShoes.body.age}&gender=${postedRunningShoes.body.gender}`)
                .then(Promise.reject)
                .catch((error) => {
                  expect(error.status).toEqual(400);
                });
            });
        });
    });
  });
});
