'use strict';

import faker from 'faker';
import Client from '../../model/client';
import { createAccountMock, removeAccountMock } from './account-mock';

const createClientMock = () => {
  const resultMock = {};

  return createAccountMock()
    .then((accountSetMock) => {
      resultMock.accountSetMock = accountSetMock;
      return new Client({
        organizationName: faker.company.companyName(),
        contactFirstName: faker.name.firstName(),
        contactLastName: faker.name.lastName(),
        title: faker.lorem.words(1),
        phoneNumber: faker.phone.phoneNumber(),
        mailingAddress: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        zipCode: faker.address.zipCode(),
        account: accountSetMock.account._id,
      }).save();
    })
    .then((client) => {
      resultMock.client = client;
      return resultMock;
    });
};

const removeClientMock = () => {
  return Promise.all([
    Client.remove({}),
    removeAccountMock(),
  ]);
};

export { createClientMock, removeClientMock };
