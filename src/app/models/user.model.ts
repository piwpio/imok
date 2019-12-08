export interface UserModel {
  id: string;
  name: string;
  email: string;
  phone: number;
  token: string;
  isLogged: boolean;
  isMaster: boolean;
}

export const DEFAULT_USER: UserModel = {
  id: '',
  name: 'Not Logged',
  email: '',
  phone: 0,
  token: '',
  isLogged: false,
  isMaster: false
};
