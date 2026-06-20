import { Container } from "react-bootstrap"
import CategoryItem from "../../components/ecommerce/Category/Category"
import styles from './styles.module.css'

import { useEffect } from "react"
import {ActGetCategories} from "../../store/categories/CategoriesSlice"
import { useAppSelector,useAppDispatch} from "../../store/hooks"

const { page, header, title, subtitle, grid } = styles

const Categories = () => {
  
  const dispatch = useAppDispatch();

  const { loading , records , error } = useAppSelector((state)=>state.categories)

  useEffect(()=>{
      dispatch(ActGetCategories());
  },[dispatch])

   
            


  let CatsList = records.length > 1 && loading == "succeeded" ? records.map((category)=>
  
    <CategoryItem key={category.slug} category={category} />

 ): loading == "failed" ? <h1>Server Down </h1>:'No Found Categories Yet'
 
  return (

    <Container className={page}>
      <div className={header}>
        <h1 className={title}>Shop by category</h1>
        <p className={subtitle}>Find what you need, sourced and packaged responsibly.</p>
      </div>

      <div className={grid}>
         {
          CatsList
         }
      </div>
    </Container>
  )
}

export default Categories