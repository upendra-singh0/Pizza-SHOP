import { Router } from 'express';

const router = Router();

router.post('/:userId', async (req, res, next) => {
  try {
    // await createOrder();
    return res.json({ message: 'Created Order Successfully' }).status(200);
  } catch (err) {
    return next(err);
  }
});

export default router;
