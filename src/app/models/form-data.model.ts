export interface LoginForm {
  email: string;
  password: string;
}

export interface CreateMasterForm {
  email: string;
  phone: string;
  password: string;
  repassword: string;
}

export interface CreateSlaveForm {
  name: string;
  pin: string;
  repin: string;
  phone: string;
}

export interface PasswordResetForm {
  email: string;
}

export interface SlaveManageForm {
  interval: number;
  active: boolean;
}
