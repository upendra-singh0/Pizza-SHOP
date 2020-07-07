import { create as createOrder } from '../services/OrderService';
// import { update as updateInventory } from '../services/ProductService';
// import ServiceError from '../util/ServiceError';

const create = async ({ userId, cart }) => {
  const order = await createOrder({ userId, cart });
  return order;
};

export { create };
