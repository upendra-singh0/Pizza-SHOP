// import { query } from '../db';
import ServiceError from '../util/ServiceError';

const userDetail = [
  { id: 1, name: 'Amazon', rule: [5] },
  { id: 2, name: 'Infosys', rule: [1] },
  { id: 3, ame: 'facebook', rule: [7, 4] },
  { id: 4, name: 'Default', rule: null },
  { id: 5, name: 'Special', rule: [7, 8] },
];

const productDetail = [
  { id: 1, name: 'small-pizza', price: 269.99 },
  { id: 2, name: 'medium-pizza', price: 322.99 },
  { id: 3, name: 'large-pizza', price: 394.99 },
];

const discountDetail = [
  { type: 'direct', id: 1, product_id: 1, rule: 299.99 },
  { type: 'quantity', id: 2, product_id: 1, rule: [2, 3] },
  { type: 'direct', id: 3, product_id: 2, rule: 299.99 },
  { type: 'quantity', id: 4, product_id: 2, rule: [4, 5] },
  { type: 'direct', id: 5, product_id: 3, rule: 299.99 },
  { type: 'quantity', id: 6, product_id: 3, rule: [2, 3] },
  { type: 'direct', id: 7, product_id: 3, rule: 389.99 },
  { type: 'quantity', id: 8, product_id: 3, rule: [2, 3] },
];

// const cart = [
//   // { name: 'small-pizza', id: 1, quantity: 5 },
//   // { name: 'medium-pizza', id: 2, quantity: 10 },
//   { name: 'large-pizza', id: 3, quantity: 6 },
// ];

const create = async ({ userId, cart }) => {
  try {
    let total = 0;
    const user = userDetail.find((u) => u.id === parseInt(userId, 10));
    if (user.rule === null) {
      cart.forEach((product) => {
        const { price } = productDetail.find((p) => p.id === product.id);
        total += price * product.quantity;
      });
      return total;
    }
    const discounts = [];
    for (let i = 0; i < user.rule.length; i += 1) {
      discounts.push(discountDetail.find((r) => r.id === user.rule[i]));
    }

    const productList = [];
    cart.forEach((product) => {
      const newProduct = productDetail.find((p) => p.id === product.id);
      productList.push({ id: product.id, price: newProduct.price, quantity: product.quantity });
    });

    productList.forEach((product) => {
      for (let i = 0; i < discounts.length; i++) {
        if (discounts[i].product_id === product.id) {
          if (discounts[i].type === 'quantity') {
            const reducible = Math.floor(product.quantity / discounts[i].rule[1]);
            const newQuant =
              reducible * discounts[i].rule[0] +
              product.quantity -
              reducible * discounts[i].rule[1];
            product.quantity = newQuant;
          } else if (discounts[i].type === 'direct') {
            product.price = discounts[i].rule;
          }
        }
      }
    });
    productList.forEach((product) => {
      total += product.price * product.quantity;
    });
    return total;
  } catch (error) {
    // throw error;
    throw new ServiceError({ message: 'Internal Service Error', status: 500 });
  }
};

export { create };
