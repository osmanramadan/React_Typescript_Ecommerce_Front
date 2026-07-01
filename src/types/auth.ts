import type { Tloading } from "./shared";

export interface IAuthState {
  user:{
    id:number;
    firstName:string;
    lastName:string;
    email:string
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
  };
  accessToken: string;
};