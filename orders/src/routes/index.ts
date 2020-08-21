import express, { Request, Response } from 'express';
import { requireAuth } from '@git-tix-dj/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  //Query to find all orders associated with this user ID.

  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send(orders);
});

export { router as indexOrderRouter };
