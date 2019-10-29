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

export interface PasswordResetForm {
  email: string;
}
