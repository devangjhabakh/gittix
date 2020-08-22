import { Subjects, Publisher, OrderCancelledEvent } from '@git-tix-dj/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
