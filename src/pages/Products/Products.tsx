import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import type { IProduct } from "../../types/product"
import ProductItem from "../../components/ecommerce/Product/Product"
import styles from './styles.module.css'
import { useAppSelector,useAppDispatch} from "../../store/hooks"
import { ActGetProducts, ClearProducts } from "../../store/products/ProductsSlice"
import Loading from "../../components/message/Loading/Loading"
import { CATEGORIES } from "../../data/categories"
import GridList from "../../components/shared/GridList/GridList"



const {
  page,
  breadcrumb,
  headerRow,
  title,
  description,
  toolbar,
  resultCount,
  sortSelect,
  grid,
  empty,
  navlinks,
} = styles






type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'



const Products = () => {
  const param = useParams()
  const dispatch = useAppDispatch();
  
  
  const { loading , records , error } = useAppSelector((state)=>state.products)



useEffect(() => {
   dispatch(ActGetProducts(param.prefex ?? ''));

   return () => {
      dispatch(ClearProducts());
   };
}, [dispatch, param.prefex]);



  let products = records.length > 0 ? records:[]

  

  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const sortedProducts = useMemo(() => {
    const list = [...products]
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price)
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }, [products, sortBy])

 
  return (
    <Container className={page}>

      <Loading status={loading} error={error}>
        <nav className={breadcrumb} aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Shop</Link>  / <span>{param.prefex}</span>
      </nav>

      <div style={{display:'flex',justifyContent:'center',justifyItems:'center'}}>
  
    <ul className={navlinks}>
      {CATEGORIES
        .map((category) => (
          <li key={category.slug}>
            <Link to={`/products/${category.slug}`}>
              {category.slug}
            </Link>
          </li>
        ))}
       </ul>
  
  
      </div>


      <div className={toolbar}>
        <span className={resultCount}>
          {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
        </span>

        <select
          className={sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          aria-label="Sort products"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        
           <GridList records={sortedProducts}  renderItem={(record)=><ProductItem key={record.id} product={record}/>}/>

      ) : (
        <div className={empty}>
          <p>No products Found yet.</p>
          <Link to="/products">Browse all products</Link>
        </div>
      )
      
      
      }
      </Loading>
    </Container>
  )
}

export default Products