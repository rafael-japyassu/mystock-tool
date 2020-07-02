export interface User{
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface UserLogged{
  token: string;
  user: UserSession;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
}
