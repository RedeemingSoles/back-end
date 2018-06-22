'use strict';

import { removeShoesRequestFormMock } from './shoes-request-form-mock';
import RequestItem from '../../model/request-item';

const removeRequestItemMock = () => {
  return Promise.all([
    RequestItem.remove({}),
    removeShoesRequestFormMock(),
  ]);
};

export default removeRequestItemMock;
