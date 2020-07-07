import ServiceError from '../util/ServiceError';

const productDetail = [
  { name: 'small-pizza', id: 1, price: 269.99 },
  { name: 'medium-pizza', id: 2, price: 322.99 },
  { name: 'large-pizza', id: 3, price: 394.99 },
];

const getAll = async () => {
  // write query
  try {
    return productDetail;
  } catch (err) {
    // console.log(err);
    throw new ServiceError({ message: 'Internal Service Error', status: 500 });
  }
};

const get = async ({ id }) => {
  // write query
  try {
    const product = productDetail.find((p) => p.id === id);
    return product;
  } catch (err) {
    // console.log(err);
    throw new ServiceError({ message: 'Internal Service Error', status: 500 });
  }
};

export { get, getAll };
