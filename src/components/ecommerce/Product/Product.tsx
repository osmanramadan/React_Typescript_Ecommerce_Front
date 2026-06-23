import { memo, useEffect, useRef, useState } from "react"
import type { IProduct } from "../../../types/product"
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector} from "../../../store/hooks"
import { addCartItem } from "../../../store/cart/CartSlice"

const {
  card,
  imageWrap,
  image,
  badge,
  badgeNew,
  badgeSale,
  badgeBestseller,
  wishlistBtn,
  body,
  name: nameClass,
  ratingRow,
  stars,
  reviewCount,
  priceRow,
  price,
  oldPrice,
  addToCartBtn,
  added,
} = styles

interface ProductItemProps {
  product: IProduct
}

const Star = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.4-5.9 3.4 1.3-6.6L2.5 9.4l6.6-.8z"
      fill={filled ? '#2e7d32' : 'none'}
      stroke={filled ? '#2e7d32' : '#c5c5c5'}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
)

const  ProductItem = memo(({ product}: ProductItemProps) => {
    
  const quantity = useAppSelector((state) => state.cart.items[product.id] ?? 0 );

 const dispatch = useAppDispatch();
  
  
  const [wishlisted, setWishlisted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [imgError, setImgError] = useState(false)
  
  const existNumProductInStock = product.numInStock - quantity
  const isStillAvailable = existNumProductInStock <= 0 ? false : true
  
  // Cleanup on unmount
  useEffect(() => {

  return () => {  // ← this is the cleanup function
    if (timerRef.current) clearTimeout(timerRef.current);
  }}, []);


  const handleAddToCart = () => {
    if (!product.inStock) return
    dispatch(addCartItem({id:product.id}))
    setJustAdded(true)

    if (timerRef.current) clearTimeout(timerRef.current); // guard against rapid clicks
    timerRef.current = setTimeout(() => setJustAdded(false), 1500);
  }

  const badgeClass =
    product.badge === 'new' ? badgeNew :
    product.badge === 'sale' ? badgeSale :
    product.badge === 'bestseller' ? badgeBestseller : ''

  return (
    <article className={card}>
      <div className={imageWrap}>
        {product.badge && (
          <span className={`${badge} ${badgeClass}`}>{product.badge}</span>
        )}
      
        <button
          type="button"
          className={wishlistBtn}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={() => setWishlisted((w) => !w)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 21s-7.5-4.6-10-9.1C0.4 8.6 1.8 5 5.3 4.2 7.6 3.7 9.8 4.7 12 7.3c2.2-2.6 4.4-3.6 6.7-3.1 3.5.8 4.9 4.4 3.3 7.7C19.5 16.4 12 21 12 21Z"
              fill={wishlisted ? '#dc3545' : 'none'}
              stroke={wishlisted ? '#dc3545' : '#fff'}
              strokeWidth="1.6"
            />
          </svg>
        </button>

        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className={image}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={image} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '0.75rem' }}>
            No image
          </div>
        )}
      </div>

      <div className={body}>
        <h3 className={nameClass}>{product.name}</h3>

        <div className={ratingRow}>
          <span className={stars}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Star key={n} filled={n <= Math.round(product.rating)} />
            ))}
          </span>
          <span className={reviewCount}>({product.reviewCount})</span>
        </div>

        <div className={priceRow}>
          <span className={price}>${product.price.toFixed(2)}</span>
          {quantity}
          {product.oldPrice && (
            <span className={oldPrice}>${product.oldPrice.toFixed(2)}</span>
          )}
        </div>

        <button
          type="button"
          className={`${addToCartBtn} ${justAdded ? added : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock || justAdded || !isStillAvailable}
        >
          {!product.inStock || !isStillAvailable ? "Out of stock" : justAdded ? "Added ✓" : "Add to cart"}
        </button>
      </div>
    </article>
  )
})

export default ProductItem