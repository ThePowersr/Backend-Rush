
export interface User {
  id: number;
  name: string;
  email: string;
  emailValidated: boolean;
  img?: string;
  cedula: string;
  createdAt: Date;
}
