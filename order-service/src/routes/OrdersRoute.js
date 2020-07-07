import { Router } from 'express';
import { create as createOrder } from '../controller/OrderController';
import processRequest from '../util/processRequest';

const router = Router();

router.post('/:userId', async (req, res, next) => {
  try {
    const { data, pathParams } = processRequest(req);
    const { userId } = pathParams;
    const { cart } = data;

    //  Validate Product details (*can be santized also*)
    // const isProductValidated = await validateProducts(products);
    // if (!isProductValidated) {
    //   throw new ServiceError({ message: 'Product details are not valid', status: 400 });
    // }

    //  Validate User
    // const user = await getUser({ id: userId });
    // if (!user) {
    //   throw new ServiceError({ message: 'User not found', status: 400 });
    // }

    const order = await createOrder({ userId, cart });
    return res.json(order);
  } catch (err) {
    return next(err);
  }
});

export default router;
