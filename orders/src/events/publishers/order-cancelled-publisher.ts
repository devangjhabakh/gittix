import { Publisher, OrderCancelledEvent, Subjects } from '@git-tix-dj/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
