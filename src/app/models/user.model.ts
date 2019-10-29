export interface UserModel {
  id: number;
  name: string;
  token: string;
  isLogged: boolean;
}

export const DEFAULT_USER: UserModel = {
  id: 0,
  name: 'Not Logged',
  token: '',
  isLogged: false
};
