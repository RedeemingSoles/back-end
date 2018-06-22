'use strict';

import { removeClientMock } from './client-mock';
import ShoesRequestForm from '../../model/shoes-request-form';

const removeShoesRequestFormMock = () => {
  return Promise.all([
    ShoesRequestForm.remove({}),
    removeClientMock(),
  ]);
};

export default removeShoesRequestFormMock;
