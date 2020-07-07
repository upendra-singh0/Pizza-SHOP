import OrdersRoute from './OrdersRoute';
// import UsersRoute from './UsersRoute';
// import ProductsRoute from './ProductsRoute';

const setupRoutes = (app) => {
  // app.use('/api/user', UsersRoute);
  app.use('/api/order', OrdersRoute);
  // app.use('/api/product', ProductsRoute);
};

export default setupRoutes;
