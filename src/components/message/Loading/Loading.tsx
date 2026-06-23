import type { Tloading } from "../../../types/shared"



type LoadingProps ={
    status:Tloading,
    error: null | string ,
    children : React.ReactNode
}

export default function Loading({status,children}:LoadingProps) {

    if(status ==="pending"){
        return <>Loading.........</>
        }
    if(status === "failed" ){
        return <>Error Occure in server .......</>
    }

    return (
      <div>
        {children}
      </div>
   )
}
