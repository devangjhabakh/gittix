import { ExpirationCompleteListener } from '../expiration-complete-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { Order } from '../../../models/order';
import mongoose from 'mongoose';
import {
  OrderStatus,
  ExpirationCompleteEvent,
  TicketCreatedEvent,
} from '@git-tix-dj/common';
import { Message } from 'node-nats-streaming';

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);
  console.log('a');

  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();
  console.log('b');

  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'adfad',
    expiresAt: new Date(),
    ticket,
  });
  await order.save();
  console.log('c');

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, order, ticket, data, msg };
};

it('updates the order status to cancelled', async () => {
  console.log('1');
  const { listener, order, data, msg } = await setup();
  console.log('2');

  await listener.onMessage(data, msg);
  console.log('3');

  const updatedOrder = await Order.findById(order.id);
  console.log('4');

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it('emits an OrderCancelled event', async () => {
  const { listener, order, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(eventData.id).toEqual(order.id);
});

it('ack the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
