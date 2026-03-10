export interface UserInterface{
  id: number;
  name: string;
  email:string;
};

export interface Createuser {
  name: string;
  email: string;
  password: string;
};

export interface UpdateUserInterface {
  id: number;
  name?: string | undefined;
  email?: string | undefined;
  password?: string;
}

export interface ValidateInterface {
  email: string,
  pass: string
};
