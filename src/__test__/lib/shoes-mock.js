'use strict';

import faker from 'faker';
import Shoes from '../../model/shoes';

const createShoesMock = () => {
  const shoesMock = {};

  return new Shoes({
    shoeType: faker.lorem.word(),
    age: 'youth',
    gender: 'female',
    size: faker.random.number(),
    donor: faker.company.companyName(),
  })
    .then((shoes) => {
      shoesMock.shoes = shoes;
      return shoesMock;
    });
};

const removeShoesMock = () => {
  return Promise.all([
    Shoes.remove({}),
  ]);
};

export { createShoesMock, removeShoesMock };
