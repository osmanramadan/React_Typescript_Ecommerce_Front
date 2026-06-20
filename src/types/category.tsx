import type { Tloading } from "./shared"

export default interface Category {
  slug?: string
  name?: string,
  image?:string,
  description?: string
}

export default interface ICategoiesState{
  records:Category[],
  loading:Tloading,
  error:string | null
}