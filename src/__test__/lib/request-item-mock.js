'use strict';

import faker from 'faker';
import { createShoesRequestFormMock, removeShoesRequestFormMock } from './shoes-request-form-mock';
import RequestItem from '../../model/request-item';

const createRequestItemMock = () => {
  const resultMock = {};

  return createShoesRequestFormMock()
    .then((shoesRequestFormSetMock) => {
      resultMock.shoesRequestFormSetMock = shoesRequestFormSetMock;
      return new RequestItem({
        childName: faker.name.firstName(),
        shoeType: faker.lorem.word(),
        age: 'youth',
        gender: 'female',
        shoeSize: faker.random.number(16),
        message: faker.lorem.words(30),
        shoesRequestForm: shoesRequestFormSetMock.shoesRequestForm._id,
      }).save();
    });
};

const removeRequestItemMock = () => {
  return Promise.all([
    RequestItem.remove({}),
    removeShoesRequestFormMock(),
  ]);
};

export { createRequestItemMock, removeRequestItemMock };
