import { Router } from 'express';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    // await createOrder({ userId, products });
    return res.json({ message: 'login Successfully' }).status(200);
  } catch (err) {
    return next(err);
  }
});

export default router;
