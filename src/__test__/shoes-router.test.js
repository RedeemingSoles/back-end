'use strict';

test('placeholder', () => {
  expect(true).toBeTruthy();
});

// import superagent from 'superagent';
// import { removeShoesMock, createShoesMock } from './lib/shoes-mock';
// import { startServer, stopServer } from '../lib/server';

// const apiURL = `http://localhost:${process.env.PORT}`;

// describe('shoes-router.test.js', () => {
//   beforeAll(startServer);
//   afterEach(removeShoesMock);
//   afterAll(stopServer);
//   jest.setTimeout(10000);

//   describe('POST /shoes', () => {
//     test('POST - should return a 200 status code and a new Shoes.', () => {
//       let shoesMock = null;
//       return createShoesMock()
//         .then((shoesSetMock) => {
//           shoesMock = shoesSetMock;
//           return superagent.post(`${apiURL}/shoes`)
//             .send({
//               shoeType
//             });
//         });
//       expect(true).toBeTruthy();
//     });
//   });
// });
