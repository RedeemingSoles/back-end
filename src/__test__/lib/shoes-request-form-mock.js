'use strict';

import { createClientMock, removeClientMock } from './client-mock';
import ShoesRequestForm from '../../model/shoes-request-form';

const createShoesRequestFormMock = () => {
  const resultMock = {};

  return createClientMock()
    .then((clientSetMock) => {
      resultMock.clientSetMock = clientSetMock;
      return new ShoesRequestForm({
        client: clientSetMock.client._id,
      }).save();
    });
};

const removeShoesRequestFormMock = () => {
  return Promise.all([
    ShoesRequestForm.remove({}),
    removeClientMock(),
  ]);
};

export { createShoesRequestFormMock, removeShoesRequestFormMock };
