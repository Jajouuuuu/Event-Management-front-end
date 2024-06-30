import { User } from "./users";
import { Event } from './event';

export interface Registration {
  registrationId: string;
  user: User;
  event: Event;
}