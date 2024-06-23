export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
  }

  type UserNameOnly = Omit<User, 'password'>;
  