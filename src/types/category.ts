import type { Tloading } from "./shared"

export interface ICategory {
  id:number,
  slug: string,
  name: string,
  image:string,
  description: string
}

export default interface ICategoiesState{
  records:ICategory[],
  loading:Tloading,
  error:string | null
}