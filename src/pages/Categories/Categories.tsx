import { Container } from "react-bootstrap"
import CategoryItem from "../../components/ecommerce/Category/Category"
import styles from './styles.module.css'

import { useEffect } from "react"
import {ActGetCategories, ClearCategories} from "../../store/categories/CategoriesSlice"
import { useAppSelector,useAppDispatch} from "../../store/hooks"
import Loading from "../../components/message/Loading/Loading"
import GridList from "../../components/shared/GridList/GridList"


const { page, header, title, subtitle, grid } = styles

const Categories = () => {
  
  const dispatch = useAppDispatch();

  const { loading , records , error } = useAppSelector((state)=>state.categories)

  useEffect(()=>{
      const promise = dispatch(ActGetCategories());
      return () => {
      promise.abort()
      dispatch(ClearCategories());
      };
  },[dispatch])

   
 
  return (

    <Container className={page}>
      <Loading status={loading} error={error}>
            <div className={header}>
               <h1 className={title}>Shop by category</h1>
               <p className={subtitle}>Find what you need, sourced and packaged responsibly.</p>
               </div>

               {
                 records.length > 1 && loading == "succeeded" ?  
                 <GridList records={records}  renderItem={(record)=><CategoryItem key={record.id}  category={record} />} /> :
                 loading == "failed" ? <h1> Server Down </h1>:'No Found Categories Yet'
               }
          </Loading>
    </Container>
  )
}

export default Categories