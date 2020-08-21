import { Publisher, Subjects, TicketUpdatedEvent } from '@git-tix-dj/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
