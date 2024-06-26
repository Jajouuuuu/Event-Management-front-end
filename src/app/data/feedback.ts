import { User } from "./users";
import { Event } from "./event";

export interface Feedback {
    feedbackId: string;
    event: Event,
    user: User,
    rating: number;
    comment: string;
    createdAt: Date; 
  }
  
export type CreateFeedbackData = Omit<Feedback, 'event' | 'user' | 'createdAt'>;