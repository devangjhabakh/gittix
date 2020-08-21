import { Subjects, Publisher, PaymentCreatedEvent } from '@git-tix-dj/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
