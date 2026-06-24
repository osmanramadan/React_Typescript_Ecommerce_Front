import { memo } from "react";
import type { IProduct } from "../../../types/product";
import styles from "./styles.module.css";


const {
  item,
  imageWrap,
  image,
  content,
  name,
  ratingRow,
  stars,
  reviewCount,
  price,
  quantityRow,
  quantity,
  actions,
  actionBtn,
  removeBtn,
} = styles;

interface CartItemProps {
  product: IProduct;
  quantityValue: number;
  rmCartItem:(num:number)=>void
    changeQuantity: (id: number, type: "inc" | "dec") => void;

}

const Star = ({ filled }: { filled: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path
      d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6-5.9-3.4-5.9 3.4 1.3-6.6L2.5 9.4l6.6-.8z"
      fill={filled ? "#2e7d32" : "none"}
      stroke={filled ? "#2e7d32" : "#c5c5c5"}
      strokeWidth="1.4"
    />
  </svg>
);

const CartItem = memo(
  ({ product, quantityValue,rmCartItem , changeQuantity
  }: CartItemProps) => {

    
   console.log("from cart item ",'**************')

    return (
      <article className={item}>
        <div className={imageWrap}>
          <img
            src={product.image}
            alt={product.name}
            className={image}
          />
        </div>

        <div className={content}>
          <h3 className={name}>{product.name}</h3>

          <div className={ratingRow}>
            <span className={stars}>
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  filled={n <= Math.round(product.rating)}
                />
              ))}
            </span>

            <span className={reviewCount}>
              ({product.reviewCount})
            </span>
          </div>

          <p className={price}>
            ${product.price.toFixed(2)}
          </p>

          <div className={quantityRow}>
            <span className={quantity}>
              Quantity: {quantityValue}
            </span>
          </div>

          <div className={actions}>
            {product.numInStock > quantityValue?<button className={actionBtn} onClick={() => changeQuantity(product.id, "inc")}>
              +
            </button>:''}

            <button className={actionBtn} onClick={() => changeQuantity(product.id, "dec")}>
              -
            </button>

            <button className={removeBtn} onClick={()=>rmCartItem(product.id)}>
              Remove
            </button>
          </div>
        </div>
      </article>
    );
  }
);

export default CartItem;