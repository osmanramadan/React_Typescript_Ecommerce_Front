
import { useAppSelector,useAppDispatch} from "../../store/hooks"
import { useEffect, useMemo, useState } from "react"
import { ActGetWishlistProducts as ActGetWishlist, ClearWishlist } from "../../store/wishlist/wishlistSlice";
import { Container } from "react-bootstrap";
import Loading from "../../components/message/Loading/Loading";
import { Link } from "react-router-dom";
import styles from './styles.module.css'
import GridList from "../../components/shared/GridList/GridList";
import ProductItem from "../../components/ecommerce/Product/Product";


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





export default function Wishlist() {

   const dispatch = useAppDispatch();
  
  
  const { productsFullData , loading , error } = useAppSelector((state)=>state.wishlist)


  useEffect(() => {
   dispatch(ActGetWishlist());
   
      return () => {
         dispatch(ClearWishlist());
      };
   
   
}, [dispatch]);


  type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'

  let products = productsFullData.length > 0 ? productsFullData:[]


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
          <p>No liked products Found yet.</p>
          <Link to="/products">Browse all products</Link>
        </div>
      )
      
      
      }
      </Loading>
    </Container>
  )}
