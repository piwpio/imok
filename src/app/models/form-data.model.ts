export interface LoginForm {
  email: string;
  password: string;
  master_login: boolean;
}

export interface PasswordResetForm {
  email: string;
}

export interface CreateMasterForm {
  email: string;
  phone: string;
  password: string;
  repassword: string;
}

export interface CreateSlaveForm {
  name: string;
  password: string;
  repassword: string;
  phone: string;
}

export interface EditSlaveForm {
  name: string;
  phone: string;
  password: string;
  repassword: string;
}

export interface SlaveManageForm {
  interval: number;
  active: boolean;
}
