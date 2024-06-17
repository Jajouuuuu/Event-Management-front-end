import { Image } from "./image"

export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string; // Pourrait être un objet avec des propriétés heures et minutes si besoin
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
    image: Image | null; // Chemin de l'image ou null si pas d'image
  }
  