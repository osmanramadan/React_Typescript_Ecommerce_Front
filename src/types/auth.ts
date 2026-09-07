import type { Tloading } from "./shared";

export interface IAuthState {
  user:{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    role?: 'user' | 'admin';
  } | null,
  accessToken:string | null;
  loading?:Tloading;
  error?:null | string;
}

export interface IAuthResponse {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role?: 'user' | 'admin';
  };
  accessToken: string;
};