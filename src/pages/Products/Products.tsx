import { useMemo, useState } from "react"
import { useLoaderData, type LoaderFunctionArgs } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getCategory, isValidCategory,CATEGORIES } from "../../data/categories"
import { MOCK_PRODUCTS } from "../../data/mockProducts"
import type { Product } from "../../types/product"
import type Category from "../../types/category"
import ProductItem from "../../components/ecommerce/Product/Product"
import styles from './styles.module.css'

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

interface ProductsLoaderData {
  category: Category
  products: Product[]
}

export  const productsLoader = ({ params }: LoaderFunctionArgs) => {
  const { prefex } = params

  if (!isValidCategory(prefex)) {
    throw new Response("Category not found", { status: 400 , statusText:'Category not found' })
  }

  const category = getCategory(prefex!) as Category
  const products = MOCK_PRODUCTS.filter((p) => p.category === category.slug)

  return { category, products }
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating'

const Products = () => {
  
  try{  
     var { category, products } = useLoaderData() as ProductsLoaderData

  }catch(e){

    //var category = getCategory("home") as Category
   // var products = MOCK_PRODUCTS.filter((p) => p.category === category.slug)
   var category  = {slug:'',name:'',image:'',description:''}  as Category

   var products = MOCK_PRODUCTS

  }

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

  const handleAddToCart = (product: Product) => {
    // TODO: wire into real cart state/context
    console.log('Added to cart:', product.id)
  }

  return (
    <Container className={page}>
      <nav className={breadcrumb} aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to="/products">Shop</Link>  / <span>{category.name}</span>
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


      <div className={headerRow}>
        <div>
          <h1 className={title}>{category.name}</h1>
          <p className={description}>{category.description}</p>
        </div>
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

      {sortedProducts.length === 0 ? (
        <div className={empty}>
          <p>No products in this category yet.</p>
          <Link to="/products">Browse all products</Link>
        </div>
      ) : (
        <div className={grid}>
          {sortedProducts.map((product) => (
            <ProductItem key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </Container>
  )
}

export default Products