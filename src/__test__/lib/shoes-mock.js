'use strict';

import Shoes from '../../model/shoes';

const removeShoesMock = () => {
  return Promise.all([
    Shoes.remove({}),
  ]);
};

export default removeShoesMock;
