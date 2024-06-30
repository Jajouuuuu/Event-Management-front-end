export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export type UserUpdate = Omit<User, 'id' | 'createdAt'>;
