import { Publisher, OrderCreatedEvent, Subjects } from '@git-tix-dj/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
