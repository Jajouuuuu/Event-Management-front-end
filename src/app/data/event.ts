import { Timestamp } from "rxjs";
import { Image } from "./image"

export interface Event {
    id: string;
    title: string;
    description: string;
    dateTime: string;
    location: string;
    category: {
      id: string;
      name: string;
    };
    createdBy: {
      id: string;
      username: string;
      email: string;
      password: string;
      createdAt: Date;
    };
    createdAt: Date;
    image: Image | null; 
  }
  