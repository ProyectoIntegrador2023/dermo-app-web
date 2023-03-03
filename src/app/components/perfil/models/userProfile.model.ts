export interface UserProfileRq {
  name: string;
  age: number;
  country: string;
  city: string;
  email: string;
}

export interface UserProfileRs {
  name: string;
  age: number;
  country: string;
  city: string;
  createdAt: string;
  updatedAt: string;
  token: string
}
