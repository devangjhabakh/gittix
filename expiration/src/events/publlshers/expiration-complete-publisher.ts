import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@git-tix-dj/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
