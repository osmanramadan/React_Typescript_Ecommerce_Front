import type { Tloading } from "../../../types/shared"



type LoadingProps ={
    status:Tloading,
    error: null | string ,
    children : React.ReactNode
}




export default function Loading({status,children,error}:LoadingProps) {

   
    if (status === 'pending')
         return <div>Loading.........</div>
    
    if (status === 'failed')
        return <div>Error Occure in server . {typeof error === 'string'?`{${error}}`:null}</div>
             
             
   
    return (
      <div>
        {children}
      </div>
   )
}
